# Task 9 — Infra Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Midras app to current stable versions everywhere (Node 22, Angular 22, Puppeteer 25, Express 5, googleapis 173, formidable 3, nodemailer 9) so it builds and deploys on modern Heroku, with behavior parity.

**Architecture:** Two PRs on separate branches. PR A modernizes the backend in place (small, file-by-file dependency migrations, each verified by a `node --test` smoke suite that runs without Google credentials). PR B ports the frontend into a **fresh Angular 22 workspace** built in `charts6-v22/`, component-by-component with browser verification, then swaps it into place as `charts6/`. Deploy docs ship with PR A; the actual Heroku deploy is Gavriel's step.

**Tech Stack:** Node 22 LTS, `node:test` (built-in, zero deps), Angular 22 (standalone components, zone.js kept ON), Sass, Playwright MCP for browser checks.

## Global Constraints

- **Never commit or push to `master`.** All work on branches `task9/backend-modernization` and `task9/angular22-port`; open PRs; Gavriel merges after review. (CLAUDE.md rule.)
- **Behavior parity, not redesign.** Same routes, same JSON shapes (`{isAuthentic, mail}`, `{status: 'success'|'fail'}`), same PDF layout, same Hebrew UI text. No new features in this task.
- Target versions (latest stable, verified on npm 2026-08-02): Angular **22.1.x**, `@angular/cli` **22.1.x**, Puppeteer **25.4.x**, Express **5.2.x**, googleapis **173.x**, formidable **3.5.x**, nodemailer **9.x**, nodemon **3.x**. Node pinned `"engines": {"node": "22.x"}`.
- The server must **start cleanly on Node 22 with no Google credentials set** (today it crashes with `ERR_UNHANDLED_REJECTION` — that's a bug to fix, and the regression test for it must stay green).
- Google-credential-dependent behavior (Sheets login, Gmail send, Drive upload) cannot be exercised locally — code changes there are kept minimal and flagged for Gavriel to verify with real credentials (his `nodemon-dev.json` / Heroku env).
- Frontend build output must land in `charts6/dist/charts6/` (flat, no `browser/` subfolder) so `server/rout.js` keeps working unchanged, and the built dist stays **committed** (current deployment practice).
- Keep **zone.js enabled** in the new workspace — the app relies on raw-XHR callbacks mutating component state (`user-anthentity.service.ts`); zoneless would silently break change detection.
- Baseline artifacts for comparison live in the scratchpad: `baseline-login.png`, `baseline-form-step1.png`, `baseline-form-camera.png`, and `baseline-mypdf-puppeteer17.pdf` (generated in Task 1).

---

# PR A — Backend modernization (branch `task9/backend-modernization`)

### Task 1: Branch + baseline PDF snapshot (with the CURRENT stack)

The old Puppeteer 17 is still installed right now — capture what its PDF output looks like before anything changes, so Task 7 has a comparison target.

**Files:**
- Create: `server/test/fixtures/sample-fields.json`
- Create: `server/test/generate-pdf-manual.js` (manual harness, reused in Task 7)

**Interfaces:**
- Produces: `sample-fields.json` — a fields object with every placeholder used by `server/final-form.html`: `activity, birthdayDay, birthdayMonth, birthdayYear, comments, email, gender, idNumber, image0, image1, image2, insurance, keshet, kolapsBow, movementLimitation, name, patalog, phone, referred, shoes, shoesMeasureType, submitTime, weight`. Later tasks rely on this exact file path.
- Produces: `node server/test/generate-pdf-manual.js` → writes `server/pdfs/mypdf.pdf` from the fixture.

- [ ] **Step 1: Create the branch**

```bash
git checkout -b task9/backend-modernization
```

- [ ] **Step 2: Write the fixture** — Hebrew-looking values so RTL rendering is exercised; images as tiny data URIs:

```json
{
  "name": "ישראל ישראלי", "idNumber": "123456789", "phone": "0501234567",
  "email": "test@example.com", "gender": "זכר", "weight": "70",
  "birthdayDay": "01", "birthdayMonth": "01", "birthdayYear": "1990",
  "activity": "ריצה", "insurance": "כללית", "keshet": "כן", "kolapsBow": "לא",
  "movementLimitation": "לא", "patalog": "אין", "referred": "חבר",
  "shoes": "42", "shoesMeasureType": "EU", "comments": "בדיקת מערכת",
  "submitTime": "02.08.2026, 12:00:00",
  "image0": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "image1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "image2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "fieldAgentName": "סוכן בדיקה", "fieldAgentMail": "agent@example.com"
}
```

- [ ] **Step 3: Write the manual harness**

```js
// server/test/generate-pdf-manual.js
// Renders the PDF from the committed fixture, bypassing Google APIs.
const pdfGenerate = require('../pdfGenerate');
const fields = require('./fixtures/sample-fields.json');

pdfGenerate.puppetPdf(fields)
    .then(() => console.log('PDF written to server/pdfs/mypdf.pdf'))
    .catch(err => { console.error(err); process.exit(1); });
```

- [ ] **Step 4: Run it with the OLD stack and save the baseline**

```bash
node server/test/generate-pdf-manual.js
cp server/pdfs/mypdf.pdf "$SCRATCHPAD/baseline-mypdf-puppeteer17.pdf"
```
Expected: PDF generated. Open/Read it to eyeball the layout (Hebrew text, images, table structure).

- [ ] **Step 5: Commit**

```bash
git add server/test/
git commit -m "test: add PDF fixture and manual render harness (baseline for upgrade)"
```

### Task 2: `node:test` smoke suite (runs with NO credentials)

**Files:**
- Create: `server/test/server.smoke.test.js`
- Modify: `package.json` (root) — `"test"` script

**Interfaces:**
- Produces: `npm test` → runs `node --test server/test/`. Every later task ends with this passing.
- Consumes: nothing from other tasks; boots `server/index.js` as a child process on port 3999.

- [ ] **Step 1: Write the failing test**

```js
// server/test/server.smoke.test.js
const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');

let server;

before(async () => {
    server = spawn(process.execPath, ['server/index.js'], {
        env: { ...process.env, PORT: '3999' },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    let out = '';
    await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('server did not start: ' + out)), 10000);
        server.stdout.on('data', d => { out += d; if (out.includes('listening')) { clearTimeout(timer); resolve(); } });
        server.stderr.on('data', d => { out += d; });
        server.on('exit', code => reject(new Error(`server exited early (code ${code}): ` + out)));
    });
});

after(() => server.kill());

test('server starts without Google credentials and stays alive', async () => {
    await new Promise(r => setTimeout(r, 500));
    assert.strictEqual(server.exitCode, null, 'server process must still be running');
});

test('GET / serves the Angular app', async () => {
    const res = await fetch('http://localhost:3999/');
    assert.strictEqual(res.status, 200);
    assert.match(await res.text(), /<app-root>/);
});

test('GET /login serves the Angular app', async () => {
    const res = await fetch('http://localhost:3999/login');
    assert.strictEqual(res.status, 200);
});

test('GET /manifest.json serves the manifest', async () => {
    const res = await fetch('http://localhost:3999/manifest.json');
    assert.strictEqual(res.status, 200);
});
```

- [ ] **Step 2: Wire `npm test` and run — expect FAIL**

In root `package.json` scripts: `"test": "node --test server/test/"`.

```bash
npm test
```
Expected: **FAIL** — "server exited early" with `sheets credentials didn't found` (this is the Node-22 startup crash; Task 3 fixes it). Note: `generate-pdf-manual.js` is not named `*.test.js`, so `node --test` ignores it.

- [ ] **Step 3: Commit the red test**

```bash
git add server/test/server.smoke.test.js package.json
git commit -m "test: add no-credentials smoke suite (red: exposes Node 22 startup crash)"
```

### Task 3: Fix the startup crash — make `getUserSheets` lazy

Root cause: `server/google_api.js:162` — `getUserSheets` is a **Promise created at `require()` time**; with no credentials it rejects immediately with nothing attached, which is fatal on Node ≥15.

**Files:**
- Modify: `server/google_api.js:162-189`
- Modify: `server/sheetsHandle.js:21`

**Interfaces:**
- Produces: `googleApi.getUserSheets()` — now a **function** returning a fresh `Promise<string[][]>` per call. Rejects with `'sheets credentials didn't found'` when `MAIN_CREDENTIALS` is unset (caught by `sheetsHandle`'s existing `.catch`).

- [ ] **Step 1: Convert the export to a function**

In `server/google_api.js`, replace `getUserSheets: new Promise(function (resolve, reject) {` with `getUserSheets: function () { return new Promise(function (resolve, reject) {` and close with `}); }` at the matching brace (line 188 `})` becomes `}); }`). Body unchanged.

- [ ] **Step 2: Update the caller**

In `server/sheetsHandle.js:21`: `const users = googleApi.getUserSheets;` → `const users = googleApi.getUserSheets();`

- [ ] **Step 3: Run the suite — expect PASS**

```bash
npm test
```
Expected: all 4 tests PASS (server now boots clean without credentials).

- [ ] **Step 4: Verify login route still degrades gracefully**

```bash
node server/index.js & sleep 1
curl -s -X POST -F userName=x -F password=y http://localhost:3000/get-user-sheets
kill %1
```
Expected: JSON `{"user":"error","error":"sheets credentials didn't found"}` — same failure shape as before, no crash.

- [ ] **Step 5: Commit**

```bash
git add server/google_api.js server/sheetsHandle.js
git commit -m "fix: lazy getUserSheets promise — server no longer crashes on Node 18+ without credentials"
```

### Task 4: Pin Node 22 + upgrade the low-risk deps

**Files:**
- Modify: `package.json` (root): add `engines`; bump `express@^5.2.1`, `nodemailer@^9.0.3`, `fs-extra@^11`, `nodemon@^3`, `body-parser` **removed** (use Express built-ins); **remove** `readline` and `xoauth2` packages.
- Modify: `server/index.js` (drop body-parser requires)
- Create: `.nvmrc` containing `22`

Rationale: the npm `readline` package shadows Node's core `readline` module that `google_api.js` actually wants; `xoauth2` is never `require()`d (nodemailer handles OAuth2 itself); Express 5 bundles `express.json()`/`express.urlencoded()`.

- [ ] **Step 1: Apply package.json changes**

```bash
npm pkg set engines.node="22.x"
npm uninstall body-parser readline xoauth2
npm install express@^5.2.1 nodemailer@^9.0.3 fs-extra@^11 nodemon@^3
echo "22" > .nvmrc
```

- [ ] **Step 2: Replace body-parser in `server/index.js`**

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```
(Remove the `bodyParser` require and the unused `urlencodedParser` const.)

- [ ] **Step 3: Run the suite**

```bash
npm test
```
Expected: PASS. Express 5 note: the routes here use only plain named params (`/:fileName`) which are unchanged in path-to-regexp 8; if a route 500s, check the Express 5 migration guide for the exact pattern.

- [ ] **Step 4: Manual route sweep** (Express 5 changed `res.sendFile` internals)

```bash
node server/index.js & sleep 1
for p in / /login /form /manifest.json /styles.98a0e5e4340ae74e7638.css; do
  echo "$p: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"; done
kill %1
```
Expected: all 200.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json server/index.js .nvmrc
git commit -m "chore: Node 22 engines pin, Express 5, nodemailer 9, drop body-parser/readline/xoauth2"
```

### Task 5: formidable 1 → 3

Breaking changes that hit this code: constructor is `formidable(opts)` not `new IncomingForm()`; `file.path`→`file.filepath`, `file.name`→`file.originalFilename`; **every parsed field value is now an array** (`fields.email` → `['x@y.z']`); upload dir must exist.

**Files:**
- Modify: `package.json` (root), `server/pdfGenerate.js:1-35`, `server/sheetsHandle.js:16-18`

**Interfaces:**
- Produces: single-value field normalization (inline `Array.isArray(v) ? v[0] : v` loop) — downstream code (`generatePdf`, `final-form.html` interpolation, `sheetsHandle` auth compare) keeps seeing plain strings.

- [ ] **Step 1: Upgrade**

```bash
npm install formidable@^3.5.4
```

- [ ] **Step 2: Migrate `server/pdfGenerate.js` `init`**

```js
const formidable = require('formidable');

init: function (req, res) {
    const uploadDir = process.cwd() + '/server/temp_image';
    fs.ensureDirSync(uploadDir);
    const form = formidable({ uploadDir, keepExtensions: true });
    form.on('fileBegin', function (name, file) {
        file.filepath = uploadDir + '/' + file.originalFilename;
    });
    form.parse(req, function (err, fields, files) {
        if (err) { console.error('error parse: ', err.message); return; }
        const single = {};
        for (const [k, v] of Object.entries(fields)) single[k] = Array.isArray(v) ? v[0] : v;
        fs.writeFile('server/assets/testMeText.json', JSON.stringify(single));
        this.generatePdf(googleApi.sendToDrive, single, res);
    }.bind(this));
},
```

- [ ] **Step 3: Migrate `server/sheetsHandle.js` `getSheets`** — same two changes: `formidable()` constructor, and normalize `fields.userName` / `fields.password` with `Array.isArray(v) ? v[0] : v` before comparing.

- [ ] **Step 4: Run suite + a real multipart POST**

```bash
npm test
node server/index.js & sleep 1
curl -s -X POST http://localhost:3000/get-user-sheets -F userName=a -F password=b
kill %1
```
Expected: tests PASS; curl returns the credentials-missing JSON error (not a crash/hang) — proves formidable 3 parses multipart.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json server/pdfGenerate.js server/sheetsHandle.js
git commit -m "chore: formidable 3 — new constructor, filepath API, array-field normalization"
```

### Task 6: googleapis 39 → 173

The call sites (`google.auth.OAuth2`, `sheets.spreadsheets.values.get` callback style, `drive.files.create`) all still exist in v173. Two touch-ups: `resource:` → `requestBody:` in `drive.files.create`, and this can't be truly exercised without credentials — **flag for Gavriel**.

**Files:**
- Modify: `package.json` (root), `server/google_api.js:137`

- [ ] **Step 1: Upgrade**

```bash
npm install googleapis@^173.0.0
```

- [ ] **Step 2: In `server/google_api.js` `uploadPdf`:** `resource: fileMetadata` → `requestBody: fileMetadata`.

- [ ] **Step 3: Run suite** — `npm test` PASS (proves the module loads and auth-less paths behave).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json server/google_api.js
git commit -m "chore: googleapis 173, requestBody in drive upload (needs credential smoke-test before deploy)"
```

**⚠ Gavriel verification step (before merging PR A):** run `npm run start:dev` with your real `nodemon-dev.json`, log in with a real Sheet user, submit a test form, confirm the email arrives and the PDF lands in Drive.

### Task 7: Puppeteer 17 → 25 + PDF parity check

Puppeteer ≥22 renders with the **new headless** mode — the PDF must be visually compared against the Task 1 baseline. Also add Heroku executable-path support.

**Files:**
- Modify: `package.json` (root), `server/pdfGenerate.js:41-49`

- [ ] **Step 1: Upgrade**

```bash
npm install puppeteer@^25.4.0
```

- [ ] **Step 2: Update launch config in `puppetPdf`**

```js
const browser = await puppet.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
```

- [ ] **Step 3: Regenerate the fixture PDF and compare to baseline**

```bash
node server/test/generate-pdf-manual.js
```
Read/open both `server/pdfs/mypdf.pdf` and `$SCRATCHPAD/baseline-mypdf-puppeteer17.pdf` side by side. Expected: same layout, fonts, RTL text, images, page count (1). Small anti-aliasing differences OK; layout shifts are NOT.

- [ ] **Step 4: Run suite** — `npm test` PASS.

- [ ] **Step 5: Restore the committed sample PDF** (don't commit the fixture-rendered one):

```bash
git checkout -- server/pdfs/mypdf.pdf 2>/dev/null || git status server/pdfs/
```

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json server/pdfGenerate.js
git commit -m "chore: puppeteer 25, executable path from env for Heroku chrome-for-testing"
```

### Task 8: Deploy docs + open PR A

**Files:**
- Create: `DEPLOY.md`
- Modify: `CLAUDE.md` (Deployment section: note Node 22 pin, chrome-for-testing buildpack, `npm test`)

- [ ] **Step 1: Write `DEPLOY.md`** — Heroku (heroku-24) checklist:

```markdown
# Deploying to Heroku (heroku-24)

1. Stack & Node: `heroku stack:set heroku-24`. Node version comes from
   `engines` in package.json (22.x).
2. Chrome for Puppeteer: add the buildpack BEFORE the Node buildpack:
   `heroku buildpacks:add -i 1 heroku-community/chrome-for-testing`
   It sets `CHROME_PATH`, which server/pdfGenerate.js picks up. Optionally set
   `PUPPETEER_SKIP_DOWNLOAD=true` to skip Puppeteer's own Chromium download.
3. Config vars (unchanged): MAIN_CREDENTIALS, GMAIL_TOKEN, DRIVE_TOKEN,
   SHEET_TOKEN, SPEADSHEET_ID, DRIVE_UPLOAD_FOLDER, senderMail.
4. Smoke test after deploy: open /login, log in, submit a test form, check
   email + Drive.
```

- [ ] **Step 2: Full check** — `npm test` PASS, `git status` clean.

- [ ] **Step 3: Push and open the PR**

```bash
git push -u origin task9/backend-modernization
gh pr create --title "Task 9a: backend modernization (Node 22, Express 5, formidable 3, googleapis 173, Puppeteer 25)" --body "..."
```
PR body must list: the startup-crash fix, each dep migration, the two ⚠ items Gavriel must verify with credentials (Google flow, Heroku deploy).

---

# PR B — Angular 22 port (branch `task9/angular22-port`)

> Branch from `task9/backend-modernization` (needs nothing from it, but avoids a dist merge conflict later; if PR A merges first, branch from master).

### Task 9: Generate the fresh Angular 22 workspace

**Files:**
- Create: `charts6-v22/` (new workspace, app name `charts6`)

**Interfaces:**
- Produces: workspace with **zone.js kept**, SCSS styles, standalone components, strict templates OFF (parity port), builds to `charts6-v22/dist/charts6/` flat.

- [ ] **Step 1: Generate** (from repo root; flags per Angular 22 CLI — adjust interactively if a flag is renamed):

```bash
npx -y @angular/cli@22 new charts6 --directory charts6-v22 --style scss --ssr false --zoneless false --skip-git
```

- [ ] **Step 2: Loosen TypeScript for the ported code** — in `charts6-v22/tsconfig.json` set `"strict": false, "noImplicitAny": false, "strictPropertyInitialization": false` and in `angularCompilerOptions` set `"strictTemplates": false`. (Parity first; tightening is future work.)

- [ ] **Step 3: Flatten the output path** — in `charts6-v22/angular.json`, `projects.charts6.architect.build.options`:

```json
"outputPath": { "base": "dist/charts6", "browser": "" }
```

- [ ] **Step 4: Environments** — create `src/environments/environment.ts` with `export const environment = { production: false, serverCall: 'http://localhost:3000' };` and `environment.prod.ts` with `{ production: true, serverCall: '' }`; add `fileReplacements` for the production configuration in angular.json (v22 doesn't scaffold these).

- [ ] **Step 5: Verify the empty shell builds**

```bash
cd charts6-v22 && npm run build
ls dist/charts6/index.html
```
Expected: build SUCCESS on Node 22 (this alone proves the Task-9 blocker is gone), index.html at the flat path.

- [ ] **Step 6: Commit**

```bash
git checkout -b task9/angular22-port
git add charts6-v22
git commit -m "feat: fresh Angular 22 workspace (zone.js on, scss, flat dist output)"
```

### Task 10: Port static shell — index.html, styles, assets, header

**Files:**
- Modify: `charts6-v22/src/index.html` (copy title `pro-active8`, GA snippet, manifest link, favicon/apple-touch meta from `charts6/src/index.html`)
- Copy: `charts6/src/app/style/*` → `charts6-v22/src/app/style/`, `charts6/src/styles.scss` → `charts6-v22/src/styles.scss`, `charts6/src/assets/*` → `charts6-v22/public/` (v22 uses `public/` for static assets — check angular.json `assets` mapping keeps URLs at `/assets/...`; if not, configure `{"glob": "**/*", "input": "public", "output": "/assets"}` to match old URL structure exactly, since `final-form.html`, the manifest, and rout.js reference `/assets/...`)
- Copy+port: `charts6/src/app/header/` → standalone `Header` component
- Modify: `charts6-v22/src/app/app.component.*` → replace scaffold with old `app.component.html` (`<app-header>` + `<router-outlet>`) and old SCSS

**Port recipe used for every component in PR B:** copy the `.ts/.html/.scss` files; add `standalone: true` is implicit in v22 — instead each component declares `imports: [...]` for what its template uses (`CommonModule` for `*ngIf`/`*ngFor`, `FormsModule`/`ReactiveFormsModule` for forms directives, `RouterLink`/`RouterOutlet` for router bits, sibling components it renders); keep selectors, template text, and SCSS byte-identical.

- [ ] **Step 1: Copy files per the list above**
- [ ] **Step 2: Build** — `npm run build` in `charts6-v22`. Expected: SUCCESS (fix any Sass `@import` path breakage by adjusting relative paths only).
- [ ] **Step 3: Serve via the real backend and screenshot**

```bash
# from repo root — temporarily overlay the new build onto the path the server
# serves (charts6/dist/charts6/), verify in the browser, then git-restore it
rsync -a --delete charts6-v22/dist/charts6/ charts6/dist/charts6/
node server/index.js & sleep 1
```
Playwright: open `http://localhost:3000/`, screenshot, compare with `$SCRATCHPAD/baseline-login.png` (header/logo/background must match). Then `git checkout -- charts6/dist` to restore.

- [ ] **Step 4: Commit** — `git add charts6-v22 && git commit -m "feat: port shell — index, global styles, assets, header"`

### Task 11: Port login (component, auth service, functional guard)

**Files:**
- Copy+port: `charts6/src/app/login/{login.component.*, login.model.ts, user-anthentity.service.ts}` → same paths under `charts6-v22/src/app/login/`
- Create: `charts6-v22/src/app/login/login-route-activator.ts` — class guards are gone in modern Angular; replace `LoginRouteActivatorService` with a functional guard, preserving exact behavior:

```ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserAnthentityService } from './user-anthentity.service';

export const loginGuard: CanActivateFn = () => {
    const auth = inject(UserAnthentityService);
    const router = inject(Router);
    if (auth.isLogin()) return true;
    router.navigate(['login']);
    return false;
};
```
(Note: old guard returned `undefined` when not logged in; returning `false` is the correct modern equivalent — same user-visible behavior, redirect to /login.)

- Create: `charts6-v22/src/app/app.routes.ts` — same 5 routes as old `app-routing.module.ts:10-16`, with `canActivate: [loginGuard]` on `form`; register via `provideRouter(routes)` in `app.config.ts`. Services (`UserAnthentityService`, `FormService`, `FormNavigationService`, `VideoService`) become `providedIn: 'root'` (drop the NgModule providers list).

- [ ] **Step 1: Port the files per above**
- [ ] **Step 2: Build** — expect SUCCESS.
- [ ] **Step 3: Browser check** — rsync dist over (as Task 10 Step 3), start server, Playwright: `/` redirects to `/login`, form fields + התחבר button render; mock `/get-user-sheets` → `{isAuthentic:true, mail:'t@e.com'}`, log in, land on `/form` (blank page for now — form not ported — that's expected; no console errors other than the known fonts CORS). Restore dist after.
- [ ] **Step 4: Commit** — `"feat: port login + functional route guard"`

### Task 12: Port the form engine (services, simple elements)

**Files:**
- Copy+port into `charts6-v22/src/app/form/`: `form.service.ts`, `form-navigation.service.ts`, `form-elements-components/{form-interface.ts, input.component.ts, textArea.component.ts, select.component.ts, birthday-input.component.ts, simple-form.component.*, radio-component/*}` and all their SCSS/HTML, plus the `index.ts` barrels (update exports to match).
- Copy+port: `midras-form.component.*` (the step renderer/submitter — `sendForm` FormData POST logic stays byte-identical).

- [ ] **Step 1: Port files**
- [ ] **Step 2: Build** — expect SUCCESS after fixing only import paths / `imports:` arrays.
- [ ] **Step 3: Browser check** — mocked login → `/form`: first question "קשת קשיחה?" with כן/לא renders (compare `$SCRATCHPAD/baseline-form-step1.png`); answer and click הבא through all question steps; verify progress bar highlights and הקודם works.
- [ ] **Step 4: Commit** — `"feat: port form engine + question elements"`

### Task 13: Port camera components + final pages

**Files:**
- Copy+port: `form-elements-components/take-image-elements/*` (foot-image component, videos component, video.service — `navigator.mediaDevices` code unchanged), `helper-component/image-component.*`, `final-page/*` (success + reject).

- [ ] **Step 1: Port files**
- [ ] **Step 2: Build** — expect SUCCESS.
- [ ] **Step 3: Browser check** — walk the form to the צילום (camera) steps; without a webcam the component should render its frame/buttons without throwing (match `$SCRATCHPAD/baseline-form-camera.png` structure); navigate past to פרטים אישיים; fill personal details; click submit → server (no creds) fails → app must route to `/reject-form` and render the reject page. That exercises success/reject routing end-to-end.
- [ ] **Step 4: Commit** — `"feat: port camera elements + success/reject pages"`

### Task 14: Swap the workspaces + rebuild the committed dist

**Files:**
- Delete: `charts6/` (old workspace — history stays in git)
- Move: `charts6-v22/` → `charts6/`
- Modify: `charts6/.gitignore` — remove the `/dist` line (dist is committed, per deployment practice)
- Modify: `CLAUDE.md` — frontend section: Angular 22, `npm run build`, no more `--prod` flag, note `charts6/dist/charts6/` flat output preserved

- [ ] **Step 1: Swap**

```bash
git rm -r charts6 && mv charts6-v22 charts6 && git add charts6
```

- [ ] **Step 2: Production build into the committed location**

```bash
cd charts6 && npm run build -- --configuration production && cd ..
git add charts6/dist
```
Verify `charts6/dist/charts6/index.html` exists (flat) and `environment.serverCall` replacement happened (grep the main bundle for `localhost:3000` — must be absent).

- [ ] **Step 3: Full-stack verification** — `npm test` (backend suite still green against the new dist), then start the server and do the complete Playwright walkthrough one final time: login (mocked) → all steps → submit → reject page. Screenshot each stage; compare against all three baselines.

- [ ] **Step 4: Commit + push + PR**

```bash
git commit -m "feat: replace Angular 9 workspace with Angular 22 port, rebuild dist"
git push -u origin task9/angular22-port
gh pr create --title "Task 9b: Angular 22 frontend port" --body "..."
```
PR body: port strategy, the guard rewrite, zone.js decision, what was verified in-browser, and the one ⚠ item for Gavriel — a real-device camera + full submission test with credentials.

---

## Final verification checklist (before Gavriel merges)

- [ ] `npm test` green on both branches.
- [ ] `cd charts6 && npm run build` green on Node 22 (the original blocker).
- [ ] PDF from fixture visually matches the Puppeteer-17 baseline.
- [ ] Browser walkthrough matches the three baseline screenshots.
- [ ] ⚠ Gavriel: credentialed end-to-end (Sheets login, email, Drive) locally via `npm run start:dev`.
- [ ] ⚠ Gavriel: Heroku deploy per `DEPLOY.md`, then a real submission in production.
