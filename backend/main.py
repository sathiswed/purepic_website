"""PurePic website demo registration API. This service is separate from licensing."""

import os
import re
import time
from collections import defaultdict, deque
from pathlib import Path
from threading import Lock
from uuid import uuid4

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from sqlalchemy import Column, DateTime, MetaData, String, Table, create_engine, func, select, text
from sqlalchemy.dialects.postgresql import UUID, insert
from sqlalchemy.engine import make_url
from sqlalchemy.exc import SQLAlchemyError


load_dotenv(Path(__file__).resolve().parent / ".env", override=False)

database_url = os.environ.get("DATABASE_URL", "")
if not database_url:
    raise RuntimeError("DATABASE_URL must be configured")
parsed_url = make_url(database_url)
if parsed_url.drivername != "postgresql+psycopg" or parsed_url.database != "purepic_website":
    raise RuntimeError("DATABASE_URL must use psycopg and the purepic_website database")

allowed_origins = [origin.strip().rstrip("/") for origin in os.environ.get("ALLOWED_ORIGINS", "").split(",") if origin.strip()]
if not allowed_origins or any(origin == "*" or not re.fullmatch(r"https?://[^/\s]+", origin) for origin in allowed_origins):
    raise RuntimeError("ALLOWED_ORIGINS must list explicit HTTP(S) origins")

engine = create_engine(database_url, pool_pre_ping=True, echo=False)
metadata = MetaData()
demo_leads = Table(
    "demo_leads",
    metadata,
    Column("id", UUID(as_uuid=True), primary_key=True),
    Column("name", String(150), nullable=False),
    Column("mobile_number", String(20), nullable=False, unique=True),
    Column("email", String(255), nullable=False),
    Column("location", String(150), nullable=False),
    Column("business_name", String(200), nullable=False),
    Column("created_at", DateTime(timezone=True), nullable=False, server_default=func.now()),
    Column("updated_at", DateTime(timezone=True), nullable=False, server_default=func.now()),
)


class DemoLeadRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    name: str = Field(min_length=1, max_length=150)
    mobile_number: str = Field(min_length=10, max_length=20)
    email: EmailStr = Field(max_length=255)
    location: str = Field(min_length=1, max_length=150)
    business_name: str = Field(min_length=1, max_length=200)

    @field_validator("name", "location", "business_name")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        return " ".join(value.split())

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.lower()

    @field_validator("mobile_number")
    @classmethod
    def normalize_mobile(cls, value: str) -> str:
        if not re.fullmatch(r"[\d\s()+-]+", value):
            raise ValueError("Enter a valid Indian mobile number")
        digits = re.sub(r"\D", "", value)
        if len(digits) == 12 and digits.startswith("91"):
            digits = digits[2:]
        elif len(digits) == 11 and digits.startswith("0"):
            digits = digits[1:]
        if not re.fullmatch(r"[6-9]\d{9}", digits):
            raise ValueError("Enter a valid Indian mobile number")
        return digits


class BodyLimitMiddleware:
    def __init__(self, app, max_bytes: int = 4096):
        self.app = app
        self.max_bytes = max_bytes

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http" or scope["path"] != "/api/demo-leads" or scope["method"] != "POST":
            await self.app(scope, receive, send)
            return

        headers = dict(scope.get("headers", []))
        try:
            content_length = int(headers.get(b"content-length", b"0"))
        except ValueError:
            content_length = self.max_bytes + 1
        if content_length > self.max_bytes:
            response = JSONResponse({"detail": "Request is too large"}, status_code=413)
            await response(scope, receive, send)
            return

        body = bytearray()
        while True:
            message = await receive()
            if message["type"] == "http.disconnect":
                return
            body.extend(message.get("body", b""))
            if len(body) > self.max_bytes:
                response = JSONResponse({"detail": "Request is too large"}, status_code=413)
                await response(scope, receive, send)
                return
            if not message.get("more_body", False):
                break

        delivered = False
        async def replay_receive():
            nonlocal delivered
            if not delivered:
                delivered = True
                return {"type": "http.request", "body": bytes(body), "more_body": False}
            return await receive()

        await self.app(scope, replay_receive, send)


class RegistrationRateLimitMiddleware:
    def __init__(self, app, max_requests: int = 5, window_seconds: int = 600):
        self.app = app
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.attempts: dict[str, deque[float]] = defaultdict(deque)
        self.lock = Lock()

    async def __call__(self, scope, receive, send):
        if scope["type"] == "http" and scope["path"] == "/api/demo-leads" and scope["method"] == "POST":
            client = scope.get("client")
            address = client[0] if client else "unknown"
            now = time.monotonic()
            with self.lock:
                history = self.attempts[address]
                while history and history[0] <= now - self.window_seconds:
                    history.popleft()
                limited = len(history) >= self.max_requests
                if not limited:
                    history.append(now)
            if limited:
                response = JSONResponse({"detail": "Too many requests. Try again later."}, status_code=429)
                await response(scope, receive, send)
                return
        await self.app(scope, receive, send)


app = FastAPI(title="PurePic Demo Registration", docs_url=None, redoc_url=None)
app.add_middleware(BodyLimitMiddleware)
app.add_middleware(RegistrationRateLimitMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.exception_handler(RequestValidationError)
async def validation_error(_request: Request, _error: RequestValidationError):
    return JSONResponse({"detail": "Please check all required details and try again."}, status_code=422)


@app.get("/health")
def health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except SQLAlchemyError:
        raise HTTPException(status_code=503, detail="Service unavailable") from None
    return {"status": "ok"}


@app.post("/api/demo-leads", status_code=201)
def register_demo(lead: DemoLeadRequest):
    try:
        with engine.begin() as connection:
            statement = (
                insert(demo_leads)
                .values(id=uuid4(), **lead.model_dump())
                .on_conflict_do_nothing(index_elements=[demo_leads.c.mobile_number])
                .returning(demo_leads.c.id)
            )
            inserted_id = connection.execute(statement).scalar_one_or_none()
            if inserted_id is None:
                existing_id = connection.execute(
                    select(demo_leads.c.id).where(demo_leads.c.mobile_number == lead.mobile_number)
                ).scalar_one_or_none()
                if existing_id is None:
                    raise RuntimeError("Registration conflict could not be resolved")
    except (SQLAlchemyError, RuntimeError):
        raise HTTPException(status_code=503, detail="Registration is temporarily unavailable. Please try again later.") from None

    if inserted_id is None:
        return JSONResponse({"success": True, "status": "already_registered"}, status_code=200)
    return {"success": True, "status": "created"}
