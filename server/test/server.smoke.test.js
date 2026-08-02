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
