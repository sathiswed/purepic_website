# PurePic demo registration API

This service stores website demo requests in its own PostgreSQL database. It does not issue licenses, send installer links, or connect to the licensing service.

## Database setup

Create the separate database and a dedicated login with access only to this database. For a local PostgreSQL instance, an administrator can run:

```powershell
psql -U postgres -d postgres -c "CREATE ROLE purepic_user LOGIN PASSWORD 'replace-with-a-strong-password';"
psql -U postgres -d postgres -c "CREATE DATABASE purepic_website OWNER purepic_user;"
psql -U purepic_user -d purepic_website -f backend/migrations/001_create_demo_leads.sql
```

If the role or database already exists, skip its creation. The table migration itself is idempotent. Use a strong password in your local environment or secret manager; never commit it.

## Configuration and startup

From the repository root:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item .env.example .env.local
py -m venv backend/.venv
.\backend\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
.\backend\.venv\Scripts\python.exe -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000 --env-file backend/.env
```

Edit `backend/.env` before starting:

The API also loads `backend/.env` automatically when started directly from the `backend` directory with `python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000`. Existing process environment variables take precedence. The `--env-file` command above remains supported.

- `DATABASE_URL`: `postgresql+psycopg://USER:PASSWORD@HOST:5432/purepic_website`. URL-encode special password characters.
- `ALLOWED_ORIGINS`: comma-separated exact frontend origins, for example `http://localhost:3000,https://www.example.com`. Do not use `*`.

Edit `.env.local`:

- `NEXT_PUBLIC_PUREPIC_API_BASE_URL`: public FastAPI origin, for example `http://localhost:8000` or your HTTPS API origin. Restart Next.js after changing this build-time value.

The table must be initialized before registration. `GET /health` checks database connectivity. `POST /api/demo-leads` accepts JSON with `name`, `mobile_number`, `email`, `location`, and `business_name`. A new lead returns HTTP 201 with `{ "success": true, "status": "created" }`. A duplicate normalized mobile number returns HTTP 200 with `{ "success": true, "status": "already_registered" }` after confirming the existing record. Other failures never return success.

The API permits five registration attempts per client IP in ten minutes and limits request bodies to 4 KB. This in-process limit is per worker. For multiple workers or instances, configure a shared rate limit at the reverse proxy or gateway. Configure the proxy to forward a trustworthy client address without accepting spoofed forwarding headers. Uvicorn access logs contain request paths and statuses; this app does not log submitted contact details.
