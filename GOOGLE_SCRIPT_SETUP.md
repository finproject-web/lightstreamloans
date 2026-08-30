# Google Apps Script Setup for Light Stream Loans

This is the simplest way to collect form submissions into a Google Sheet and receive email notifications.

## 1. Create the Google Sheet

1. Open [Google Sheets](https://sheets.new).
2. Name the spreadsheet (e.g. `Light Stream Loans Applications`).
3. It will automatically create a tab called `Applications`, matching the script.

## 2. Paste the script

1. In the new sheet, go to **Extensions → Apps Script**.
2. Delete the default `myFunction` code.
3. Copy the entire contents of `google-apps-script.gs` from this project and paste it into the Apps Script editor.
4. Update the `RECIPIENTS` line at the top with both notification emails, separated by a comma:

```javascript
const RECIPIENTS = "finnfoxpersonalloan@gmail.com, second-email@example.com";
```

5. Click **Save** (disk icon).

## 3. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon and choose **Web app**.
3. Set:
   - **Description:** `Light Stream Loans webhook`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy** and review permissions.
5. Copy the **Web app URL**.

## 4. Connect the website

1. In the project folder, create a file named `.env.local`.
2. Paste the Web app URL:

```bash
GOOGLE_SCRIPT_URL=your-copied-web-app-url
```

3. Restart the local server:

```bash
npm run dev
```

The form will now send data to your Google Sheet and both emails will be notified.
