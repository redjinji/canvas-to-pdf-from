# Deploying to Heroku (heroku-24)

1. **Stack & Node**: `heroku stack:set heroku-24`. Node version comes from `engines` in
   `package.json` (`22.x`) — no separate buildpack config needed for the Node version itself.
2. **Chrome for Puppeteer**: add the Chrome buildpack *before* the Node buildpack:
   ```
   heroku buildpacks:add -i 1 heroku-community/chrome-for-testing
   ```
   This buildpack installs Chrome for Testing and sets `CHROME_PATH`, which
   `server/pdfGenerate.js` reads (`process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH`)
   when launching Puppeteer. Optionally set `PUPPETEER_SKIP_DOWNLOAD=true` as a config var so
   Puppeteer doesn't also download its own bundled Chromium during `npm install` — the buildpack's
   Chrome is what actually gets used.
3. **Config vars** (unchanged from before this upgrade): `MAIN_CREDENTIALS`, `GMAIL_TOKEN`,
   `DRIVE_TOKEN`, `SHEET_TOKEN`, `SPEADSHEET_ID`, `DRIVE_UPLOAD_FOLDER`, `senderMail`.
   The production environment also carries `SHEET_CREDENTIALS` and `DRIVE_CREDENTIALS` — those are
   **legacy leftovers from a pre-2020 version of the code and are never read**; the current code
   authenticates all three Google services with `MAIN_CREDENTIALS` alone. Don't copy them to new
   environments.
4. **Smoke test after deploy**: open `/login`, log in, submit a test form, and confirm the email
   arrives and the PDF lands in the Drive folder. Also eyeball the PDF itself — this upgrade
   changed how Chrome renders the form's webfont (see the PR description's "PDF rendering notes"
   section and the derivation comments above `puppetPdf` in `server/pdfGenerate.js`) — digits and
   Latin text now render in Alef instead of falling back to Arial.

## Staging app (side-by-side with production)

Production is untouched by a staging app: it is a separate Heroku app with its own dyno, URL, and
config vars, and production deploys track `master` while staging deploys a feature branch.

1. Create a new app in the Heroku dashboard (e.g. `midras-staging`), stack heroku-24.
2. **Settings → Buildpacks**, order matters: `heroku-community/chrome-for-testing` first,
   `heroku/nodejs` second.
3. **Settings → Config Vars**: add the vars from step 3 above (see the next section to generate
   them for your own Google account), plus `PUPPETEER_SKIP_DOWNLOAD` = `true`.
4. **Deploy tab**: connect the GitHub repo, pick the branch to test (e.g. `task9/angular22-port`),
   Manual Deploy. (CLI alternative: `heroku git:remote -a midras-staging -r staging` then
   `git push staging <branch>:main`.)
5. Test at the app URL: log in with a user from your test Sheet, submit a form (from a phone for a
   real camera test), confirm the email arrives and the PDF lands in your test Drive folder.

## Setting up the Google side with your own account

The app uses one OAuth "Desktop app" client (`MAIN_CREDENTIALS`) plus three stored OAuth tokens.
To build a complete environment on your own Google account:

1. **Google Cloud Console** (console.cloud.google.com): create a project (e.g. `midras-staging`).
2. **APIs & Services → Library**: enable **Gmail API**, **Google Drive API**, **Google Sheets API**.
3. **OAuth consent screen**: External; add your own Google account as a **test user**. Keeping the
   app in *Testing* mode is fine for staging, with one caveat: Google expires refresh tokens of
   testing-mode apps after **7 days**, so tokens must be re-minted weekly (production's original
   client predates this policy). Publishing the app avoids the expiry but Gmail's full-access scope
   is a "restricted" scope that triggers Google's verification process — not worth it for staging.
4. **Credentials → Create credentials → OAuth client ID → Desktop app**; download the JSON. That
   whole JSON (the `{"installed":{...}}` object) is the value of `MAIN_CREDENTIALS`.
5. **Mint the three tokens** with the helper script (run locally, once per service):
   ```
   MAIN_CREDENTIALS="$(cat ~/Downloads/client_secret_*.json)" node server/tools/get-google-token.js gmail
   MAIN_CREDENTIALS="$(cat ~/Downloads/client_secret_*.json)" node server/tools/get-google-token.js sheets
   MAIN_CREDENTIALS="$(cat ~/Downloads/client_secret_*.json)" node server/tools/get-google-token.js drive
   ```
   Each run prints an auth URL — open it, approve, then copy the `code` parameter from the
   resulting (unreachable) `http://localhost/?code=...` address-bar URL and paste it into the
   terminal. The script prints the token JSON to set as `GMAIL_TOKEN` / `SHEET_TOKEN` /
   `DRIVE_TOKEN` respectively.
6. **Your resources**:
   - `SPEADSHEET_ID` (note the historical misspelling): create a Google Sheet with columns
     `A:C` = username, password, mail (one row per allowed agent); the ID is the long segment of
     the sheet's URL between `/d/` and `/edit`.
   - `DRIVE_UPLOAD_FOLDER`: create a Drive folder for the PDFs; the ID is the last URL segment.
   - `senderMail`: the Gmail address of the account that granted the tokens.

## Local verification before deploying

- `npm test` from the repo root runs the full smoke + PDF regression suite without any Google
  credentials configured (10 tests). It exercises the Puppeteer render path directly, so Chromium
  must be installed locally (`npx puppeteer browsers install chrome` if `npm install` skipped the
  download).
- To verify the credentialed flows (Sheet login, email send, Drive upload) that `npm test`
  deliberately does not cover, run `npm run start:dev` with a real `nodemon-dev.json` (gitignored;
  supplies `MAIN_CREDENTIALS`/`*_TOKEN`/etc.) and exercise the app manually.
