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
4. **Smoke test after deploy**: open `/login`, log in, submit a test form, and confirm the email
   arrives and the PDF lands in the Drive folder. Also eyeball the PDF itself — this upgrade
   changed how Chrome renders the form's webfont (see the PR description's "PDF rendering notes"
   section and the derivation comments above `puppetPdf` in `server/pdfGenerate.js`) — digits and
   Latin text now render in Alef instead of falling back to Arial.

## Local verification before deploying

- `npm test` from the repo root runs the full smoke + PDF regression suite without any Google
  credentials configured (10 tests). It exercises the Puppeteer render path directly, so Chromium
  must be installed locally (`npx puppeteer browsers install chrome` if `npm install` skipped the
  download).
- To verify the credentialed flows (Sheet login, email send, Drive upload) that `npm test`
  deliberately does not cover, run `npm run start:dev` with a real `nodemon-dev.json` (gitignored;
  supplies `MAIN_CREDENTIALS`/`*_TOKEN`/etc.) and exercise the app manually.
