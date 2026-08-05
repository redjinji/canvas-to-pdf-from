# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A foot-orthotics ("midras") intake application for Active8. Field agents log in, fill out a
multi-step Hebrew (RTL) form that includes camera-captured foot images, and submit it. The backend
renders the submission into a PDF, emails it to the customer (and CCs the agent), and uploads it to
Google Drive. User authentication is checked against a Google Sheet.

The repo contains **two separate Node projects** that are developed and built independently:

- **`server/`** — Express backend (plain JS, CommonJS). Run from the repo root via the root
  `package.json`.
- **`charts6/`** — Angular 22 frontend (TypeScript), its own `package.json` and toolchain. This is
  the **active** frontend. The server serves its built output from `charts6/dist/charts6/` (flat
  output directory, unchanged path).

`client/` is a legacy static frontend; all of `rout.js`'s page routes have been switched to serve
`charts6/dist`. Treat `client/` as dead code unless told otherwise.

## Git workflow (IMPORTANT)

**Never commit or push directly to `master`.** For any change: create a new branch, commit there,
push the branch, and open a PR. The user (Gavriel) merges PRs to `master` only after reviewing them
himself. Do not merge PRs on his behalf.

## Commands

### Backend (run from repo root)
- `npm start` — start the server with nodemon (uses `nodemon.json`). Listens on `PORT` env var or 3000.
- `npm run start:dev` — start with `nodemon-dev.json` (gitignored; create locally).
- `npm test` — `node:test` smoke + PDF regression suite (`server/test/*.test.js`, 10 tests). Runs
  without any Google credentials (the server must start cleanly with none configured — see
  `server/google_api.js#getUserSheets` below). The PDF-fit tests render real PDFs; two of them read
  the output back with `pdftotext -bbox-layout` (poppler-utils) and skip gracefully if `pdftotext`
  isn't installed locally, everything else still runs. No linter for the backend.

### Frontend (run from `charts6/`)
- `npm start` / `ng serve` — dev server on `http://localhost:4200` (the backend CORS-allows this origin).
- `npm run build` (= `ng build`) — production build by default (the `--prod` flag is gone in
  Angular 22), builds into `charts6/dist/charts6/` (flat). **The server serves the built output, so
  you must rebuild after frontend changes for them to appear in the running app.** `npm run
  build:prod` is kept as an alias for muscle-memory compatibility.
- `ng test` — unit tests, now run via **vitest** (not Karma). `ng test --include='**/some.spec.ts'`
  to run a single spec.

## Architecture & request flow

### Routing (`server/rout.js`)
All Express routes are defined in one `rout()` function. Key endpoints:
- `GET /`, `/login`, `/form`, and the catch-all `GET /:fileName` + `/assets/...` routes serve the
  Angular SPA and its static assets out of `charts6/dist/charts6/`.
- `POST /get-user-sheets` → `sheetsHandle.getSheets` — login auth against the Google Sheet.
- `POST /sendForm` and `POST /create_pdf` → `pdfGenerate.init` — main submission handler.
- `GET /regenerateLastPdf` → re-renders the PDF from the last saved submission.
- `GET /force-restart` → writes a random value to `server/assets/forceUpdate.json` (a signal
  consumed by Google Sheets users) and redirects to the production app.

### PDF generation (`server/pdfGenerate.js`)
This is the core of the backend. Flow:
1. `init` parses the multipart submission with **formidable**, saving uploaded foot images into
   `server/temp_image/` and the form fields into `server/assets/testMeText.json`.
2. `puppetPdf` injects the fields into the `server/final-form.html` template via the
   **angular-template** package (`{{ }}` interpolation — the template is a plain HTML file, not an
   Angular component), writes the rendered HTML to `server/assets/testMeText.html`, then uses
   **Puppeteer** (headless Chromium, `--no-sandbox`) to print page 1 as A4 to `server/pdfs/mypdf.pdf`.
3. `generatePdf` then calls `googleApi.sendToDrive` and, if an email is present,
   `googleApi.sendMail`, and resolves the HTTP response with `{status: 'success' | 'fail'}`.

Note: there is a single fixed output file (`server/pdfs/mypdf.pdf`) and a single saved-fields file —
the app processes one submission at a time, not concurrently. The frontend routes to `/success-form`
or `/reject-form` based on the returned status.

### Google integration (`server/google_api.js`)
Handles Gmail (send PDF via nodemailer + OAuth2), Drive (upload PDF), and Sheets (read the user
list). All three authenticate through `authorize()`, which expects an OAuth2 token already present in
an env var; if missing, `getAccessToken()` falls back to an **interactive `readline` prompt on
stdin** to complete the OAuth flow and prints the token to the console for you to capture.

### Frontend (`charts6/src/app/`)
- The form is **data-driven**: `form/form.service.ts` holds a `FORM_ELEMENTS` array describing every
  step (radio/textarea/select/image/etc.). `midras-form.component.ts` renders the steps and
  `form-navigation.service.ts` drives next/prev navigation (horizontal `translateX` transitions).
- Foot images are captured in-browser via the camera components under
  `form/form-elements-components/take-image-elements/`.
- On submit, `midras-form.component.ts#sendForm` builds a `FormData` (including the logged-in
  agent's name/mail from `localStorage.userAuth` and a Hebrew-locale timestamp) and POSTs to
  `${environment.serverCall}/sendForm`.
- Auth: `login/user-anthentity.service.ts` POSTs credentials to `/get-user-sheets`;
  the functional `loginGuard` (exported from `charts6/src/app/login/login-route-activator.ts`) guards the `/form` route. Login state is the in-memory
  `loginAlready` flag (lost on refresh) plus `localStorage.userAuth`.
- `environment.serverCall` is `http://localhost:3000` in dev and `''` (same-origin) in prod
  (`environment.prod.ts`, swapped in via `fileReplacements` in the `production` build configuration,
  which is `ng build`'s default).

## Configuration / environment

The backend reads everything sensitive from environment variables (loaded via `.env` / the gitignored
`nodemon-*.json` files — none are committed). Required vars:
- `MAIN_CREDENTIALS` — JSON of the Google OAuth client (`installed` shape), used for Gmail, Drive, and Sheets.
- `<SERVICE>_TOKEN` env vars (e.g. `GMAIL_TOKEN`, `DRIVE_TOKEN`, `SHEET_TOKEN`) — stored OAuth tokens; if
  absent, the app drops into the interactive stdin OAuth flow.
- `SPEADSHEET_ID` (note the spelling) — the Sheet ID for the user list; read from range `A:C`
  (columns: username, password, mail).
- `DRIVE_UPLOAD_FOLDER` — target Drive folder ID for uploaded PDFs.
- `senderMail` — the Gmail account PDFs are sent from.
- `PORT` — server port (default 3000).

## Deployment

`Procfile` runs `npm start` (web dyno; Heroku-style). Node version is pinned via `engines` in
`package.json` (`24.x`, current Active LTS, EOL 2028) and `.nvmrc`. Puppeteer launches headless Chromium with `--no-sandbox`,
picking an explicit binary via `process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH`
(`server/pdfGenerate.js`) — on Heroku the `heroku-community/chrome-for-testing` buildpack (added
before the Node buildpack) installs Chrome but does **not** set any env var, so
`PUPPETEER_EXECUTABLE_PATH=/app/.chrome-for-testing/chrome-linux64/chrome` must be set as a config
var, plus `PUPPETEER_SKIP_DOWNLOAD=true` so Puppeteer doesn't also fetch its own bundled Chromium. See `DEPLOY.md` for the full
Heroku (heroku-26) checklist. The committed `charts6/dist/` is what gets served in production, so a
frontend change is only live after rebuilding and committing the dist output.

Production runs on the client's Heroku app `pro-active8` (deploys track `master`). A separate
staging app `midras-staging` (Gavriel's Heroku + Google account, own test Sheet/Drive) exists for
pre-merge testing — deploy any branch to it with `git push staging <branch>:main` (the `staging`
git remote); see `DEPLOY.md` for its full setup, including minting Google tokens with
`server/tools/get-google-token.js`.
