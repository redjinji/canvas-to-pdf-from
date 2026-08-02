// server/test/server.smoke.test.js
const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.SMOKE_TEST_PORT || '3999';
const BASE_URL = `http://localhost:${PORT}`;
const TEST_ME_TEXT_PATH = path.join(process.cwd(), 'server/assets/testMeText.json');
const fixtureFields = require('./fixtures/sample-fields.json');

let server;

before(async () => {
    server = spawn(process.execPath, ['server/index.js'], {
        env: { ...process.env, PORT },
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
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);
    assert.match(await res.text(), /<app-root>/);
});

test('GET /login serves the Angular app', async () => {
    const res = await fetch(`${BASE_URL}/login`);
    assert.strictEqual(res.status, 200);
});

test('GET /manifest.json serves the manifest', async () => {
    const res = await fetch(`${BASE_URL}/manifest.json`);
    assert.strictEqual(res.status, 200);
});

// Regression test for the fatal crash in server/pdfGenerate.js#regeneratePdf on Node 22: with no
// saved submission on disk, `fs.readJson` used to reject with nothing awaiting/catching it
// (unhandled rejection -> fatal), and even when a submission WAS present the old code called
// `res('done')` - res is an Express Response object, not a function, so that threw too. Both arms
// used to kill the whole process; the route is also unauthenticated, so any request to it could
// take the server down. This only exercises the "file absent" arm (the common case on a fresh,
// credential-free deploy, since server/assets/testMeText.json is gitignored), but the fix (a
// try/catch that always responds, never lets a rejection escape) covers both arms identically.
test('GET /regenerateLastPdf with no saved submission responds and does not crash the server', async () => {
    fs.rmSync(TEST_ME_TEXT_PATH, { force: true });

    const res = await fetch(`${BASE_URL}/regenerateLastPdf`);
    // Any response at all (2xx/4xx/5xx) is fine - what matters is that one arrives instead of the
    // connection dying because the process crashed.
    assert.ok(res.status >= 200 && res.status < 600, `expected a real HTTP response, got status ${res.status}`);

    // Prove the server is still alive: a completely unrelated route still answers normally.
    const followUp = await fetch(`${BASE_URL}/`);
    assert.strictEqual(followUp.status, 200, 'server should still be serving requests after /regenerateLastPdf');
    assert.strictEqual(server.exitCode, null, 'server process must still be running');
});

// Regression test for the fatal crash in server/pdfGenerate.js#generatePdf + server/google_api.js
// on Node 22: without MAIN_CREDENTIALS, sendToDrive's returned promise used to reject
// synchronously while the code was still `await`ing sendMail - and sendMail's promise executor
// used to just log and return without ever resolving/rejecting, so it never settled. That left the
// Drive-upload rejection with no attached handler by the time Node checks for unhandled
// rejections -> fatal crash. Fixed by (1) making sendMail reject instead of hanging when
// credentials are absent, and (2) attaching a handler to the Drive-upload promise immediately at
// creation. This test posts a real, complete (credential-free) submission - using the same fixture
// as server/test/pdf.test.js, so the render succeeds and the request actually reaches the
// sendMail/sendToDrive stage this regression is about, rather than failing earlier in the
// template. It renders a real PDF via Puppeteer first, so it's given a generous timeout - and
// asserts a {status:'fail'} response arrives (surfacing the "credentials didn't found" error) and
// the server survives.
test('POST /sendForm without Google credentials responds with status fail and does not crash the server', { timeout: 30000 }, async () => {
    const form = new FormData();
    for (const [key, value] of Object.entries(fixtureFields)) form.append(key, value);

    const res = await fetch(`${BASE_URL}/sendForm`, { method: 'POST', body: form });
    assert.ok(res.status < 600, `expected a real HTTP response, got status ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.status, 'fail', `expected {status: 'fail'} without credentials, got ${JSON.stringify(body)}`);

    const followUp = await fetch(`${BASE_URL}/`);
    assert.strictEqual(followUp.status, 200, 'server should still be serving requests after /sendForm');
    assert.strictEqual(server.exitCode, null, 'server process must still be running');
});
