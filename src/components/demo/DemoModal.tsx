"use client";

import { ArrowRight, Check, X } from "lucide-react";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Field = "name" | "mobile_number" | "email" | "location" | "business_name";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const emptyValues: Values = {
  name: "",
  mobile_number: "",
  email: "",
  location: "",
  business_name: "",
};

const apiBaseUrl = process.env.NEXT_PUBLIC_PUREPIC_API_BASE_URL?.replace(/\/$/, "");
const DemoContext = createContext<(trigger?: HTMLButtonElement) => void>(() => {});

function normalizeMobile(value: string) {
  const input = value.trim();
  if (!/^[\d\s()+-]+$/.test(input)) return "";
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : "";
}

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!normalizeMobile(values.mobile_number)) {
    errors.mobile_number = "Enter a valid 10-digit Indian mobile number.";
  }
  const email = values.email.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.location.trim()) errors.location = "Enter your city or location.";
  if (!values.business_name.trim()) errors.business_name = "Enter your business name.";
  return errors;
}

export function DemoTrigger({
  children,
  className,
  onOpen,
}: {
  children: ReactNode;
  className: string;
  onOpen?: () => void;
}) {
  const openDemo = useContext(DemoContext);
  return (
    <button
      type="button"
      className={className}
      data-demo-trigger
      onClick={(event) => {
        onOpen?.();
        openDemo(event.currentTarget);
      }}
    >
      {children}
    </button>
  );
}

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false);
  const previousOverflowRef = useRef("");
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [requestError, setRequestError] = useState("");

  function reset() {
    setValues({ ...emptyValues });
    setErrors({});
    setSubmitting(false);
    setSucceeded(false);
    setRequestError("");
    inFlightRef.current = false;
  }

  function openDemo(trigger?: HTMLButtonElement) {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    lastTriggerRef.current = trigger ?? null;
    reset();
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    requestAnimationFrame(() => {
      if (dialog.open) firstFieldRef.current?.focus();
    });
  }

  function closeDemo() {
    requestRef.current?.abort();
    dialogRef.current?.close();
  }

  function handleClose() {
    requestRef.current?.abort();
    requestRef.current = null;
    document.body.style.overflow = previousOverflowRef.current;
    reset();
    const url = new URL(window.location.href);
    if (url.searchParams.has("demo")) {
      url.searchParams.delete("demo");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
    (lastTriggerRef.current ?? document.querySelector<HTMLButtonElement>("[data-demo-trigger]"))?.focus();
    lastTriggerRef.current = null;
  }

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") === "1") {
      openDemo();
    }
    return () => {
      requestRef.current?.abort();
    };
    // Open the modal after the /demo route redirects to ?demo=1.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (requestError) setRequestError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstError = (Object.keys(emptyValues) as Field[]).find((field) => nextErrors[field]);
    if (firstError) {
      document.getElementById(`demo-${firstError}`)?.focus();
      return;
    }
    if (!apiBaseUrl) {
      setRequestError("Registration is temporarily unavailable. Please try again later.");
      return;
    }

    inFlightRef.current = true;
    setSubmitting(true);
    setRequestError("");
    const controller = new AbortController();
    requestRef.current = controller;

    try {
      const response = await fetch(`${apiBaseUrl}/api/demo-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          mobile_number: normalizeMobile(values.mobile_number),
          email: values.email.trim().toLowerCase(),
          location: values.location.trim(),
          business_name: values.business_name.trim(),
        }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (
        !response.ok ||
        result?.success !== true ||
        !["created", "already_registered"].includes(result?.status)
      ) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }
        if (response.status === 422) {
          throw new Error("Please review your details and try again.");
        }
        throw new Error("We could not save your request. Please try again later.");
      }
      if (!controller.signal.aborted) setSucceeded(true);
    } catch (error) {
      if (!controller.signal.aborted) {
        setRequestError(
          error instanceof Error && error.message.startsWith("Too many requests")
            ? error.message
            : error instanceof Error && error.message.startsWith("Please review")
              ? error.message
              : "We could not save your request. Please check your connection and try again.",
        );
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        inFlightRef.current = false;
        setSubmitting(false);
      }
    }
  }

  const fields: {
    name: Field;
    label: string;
    type: string;
    autoComplete: string;
    maxLength: number;
    inputMode?: "tel" | "email";
  }[] = [
    { name: "name", label: "Full Name", type: "text", autoComplete: "name", maxLength: 150 },
    { name: "mobile_number", label: "Mobile Number", type: "tel", autoComplete: "tel-national", maxLength: 18, inputMode: "tel" },
    { name: "email", label: "Email Address", type: "email", autoComplete: "email", maxLength: 255, inputMode: "email" },
    { name: "location", label: "Location / City", type: "text", autoComplete: "address-level2", maxLength: 150 },
    { name: "business_name", label: "Business Name", type: "text", autoComplete: "organization", maxLength: 200 },
  ];

  return (
    <DemoContext.Provider value={openDemo}>
      {children}
      <dialog
        ref={dialogRef}
        className="demo-registration-dialog"
        aria-labelledby="demo-modal-title"
        aria-describedby="demo-modal-description"
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDemo();
        }}
      >
        <div className="demo-registration-panel">
          <button type="button" className="demo-registration-close" aria-label="Close demo form" onClick={closeDemo}>
            <X aria-hidden="true" size={22} />
          </button>
          {succeeded ? (
            <div className="demo-registration-success" role="status">
              <span className="demo-registration-check"><Check aria-hidden="true" size={32} /></span>
              <h2 id="demo-modal-title">Thank You for Your Interest!</h2>
              <p id="demo-modal-description">
                Thank you for sharing your details. Our team will send you the PurePic installer link shortly.
              </p>
              <button type="button" className="demo-registration-submit" onClick={closeDemo}>Close</button>
            </div>
          ) : (
            <>
              <p className="demo-registration-eyebrow">Get Free Demo</p>
              <h2 id="demo-modal-title">See what PurePic can do for you.</h2>
              <p id="demo-modal-description">
                Share your details and our team will follow up with the PurePic installer link.
              </p>
              <form onSubmit={submit} noValidate>
                <div className="demo-registration-fields">
                  {fields.map((field) => (
                    <div className="demo-registration-field" key={field.name}>
                      <label htmlFor={`demo-${field.name}`}>{field.label} <span aria-hidden="true">*</span></label>
                      <input
                        ref={field.name === "name" ? firstFieldRef : undefined}
                        id={`demo-${field.name}`}
                        name={field.name}
                        type={field.type}
                        inputMode={field.inputMode}
                        autoComplete={field.autoComplete}
                        maxLength={field.maxLength}
                        required
                        value={values[field.name]}
                        onChange={(event) => update(field.name, event.target.value)}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={errors[field.name] ? `demo-${field.name}-error` : undefined}
                      />
                      {errors[field.name] && (
                        <span className="demo-registration-field-error" id={`demo-${field.name}-error`}>
                          {errors[field.name]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {requestError && <p className="demo-registration-error" role="alert">{requestError}</p>}
                <button type="submit" className="demo-registration-submit" disabled={submitting}>
                  {submitting ? "Submitting..." : <>Submit Request <ArrowRight aria-hidden="true" size={19} /></>}
                </button>
                <p className="demo-registration-note">Our team will use these details only to follow up about your PurePic demo.</p>
              </form>
            </>
          )}
        </div>
      </dialog>
    </DemoContext.Provider>
  );
}
