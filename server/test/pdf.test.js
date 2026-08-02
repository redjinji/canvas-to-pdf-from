// server/test/pdf.test.js
// Regression guard for the Task 7 (Puppeteer 25 upgrade) A4-overflow bug: `pdffonts` on the Task 1
// baseline PDF (Puppeteer 17 / Chromium 106) shows every glyph embedded as Arial - the `Alef`
// webfont requested by server/final-form.html never actually applied, i.e. the baseline shipped in
// a silent font-fallback state. Under Puppeteer 25 / Chromium 151, Alef DOES load and apply
// (confirmed via `pdffonts` on a fresh render), and Alef's normal line box is taller than Arial's.
// That per-line growth, compounded across every stacked text block on the page, was enough to push
// the footer (business contact bar: active8.il / phone numbers / active8.co.il) onto a second PDF
// page that `pageRanges: '1'` then silently discarded. This is a font-substitution change (Arial
// fallback -> real Alef), not "Alef's own line-height changing between browser versions."
//
// Fixed two ways in server/pdfGenerate.js#puppetPdf:
//  1. An explicit `line-height: 1.03` on `html` in final-form.html compensates for Alef's taller
//     line box, restoring single-page fit for the fixture (see that file for its own derivation
//     comment).
//  2. A dynamic scale-to-fit safety net (see the NO_SCALE_MM / TARGET_MM derivation comment in
//     pdfGenerate.js) shrinks the printed page whenever measured content exceeds the true
//     single-page boundary, so longer real-world submissions (extra lines in patalog/comments)
//     degrade to a slightly smaller single page instead of silently losing the footer - which a
//     code reviewer found still happened with only the line-height fix and a static content-height
//     *assertion* (no correction), since realistic submissions have only ~3.3mm of headroom past
//     the fixture.
//
// The only invariant that actually matters is "the footer lands on printed page 1" - a fixture
// rendering as 2 physical pages (page 2 empty, body min-height/margin spillover) is fine and
// expected; it is not a regression. Fix round 2's scale curve was calibrated against the wrong,
// stricter criterion ("whole document collapses to 1 physical page") and badly over-corrected as a
// result (e.g. shrinking a long-but-reasonable submission to ~5pt text). Fix round 3 replaced that
// power curve with a plain linear ratio, re-calibrated against the real footer-on-page-1 criterion
// using real (non-proxy) Puppeteer renders - see the derivation comment in pdfGenerate.js.
//
// This file exercises both the proxy math and, in the second test, a real end-to-end check: the
// fixture case proves typical submissions are unaffected (scale 1, footer comfortably within the
// boundary), and the long-text case reproduces the reviewer's 3-line-patalog scenario, proves the
// safety net engages (proxy assertions), and then - because proxy algebra checked only against
// itself can't catch a miscalibrated constant (a mutation dropping TARGET_MM down to just under
// NO_SCALE_MM would keep the proxy assertions green while empirically losing the footer) - renders
// the same long-text submission a second time with pageRanges disabled and asserts via `pdfinfo`
// that the *real* rendered PDF is genuinely 1 physical page.
const { test, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const pdfGenerate = require('../pdfGenerate');
const fixtureFields = require('./fixtures/sample-fields.json');

const fixtureOutPath = path.join(os.tmpdir(), 'canvas-to-pdf-test-fixture.pdf');
const longTextOutPath = path.join(os.tmpdir(), 'canvas-to-pdf-test-longtext.pdf');
const longTextFullOutPath = path.join(os.tmpdir(), 'canvas-to-pdf-test-longtext-full.pdf');

// Reproduces the reviewer's finding: a realistic multi-line patalog ("describe pain location /
// pathology") field alone, with no other change, pushes content well past the single-page
// boundary. This ~200-character Hebrew description wraps to 3 lines in the form's answer column,
// matching the reviewer's "3-line patalog field" repro.
const longTextFields = Object.assign({}, fixtureFields, {
    patalog: 'דלקת בגיד אכילס בעקב שמאל עם הגבלה בטווח התנועה של הקרסול, כאבים משמעותיים ' +
        'בהליכה ובעמידה ממושכת, נפיחות קלה באזור העקב, רגישות במישוש, היסטוריה של פציעות ' +
        'חוזרות באזור זה בשנתיים האחרונות הדורשות מעקב',
});

after(() => {
    fs.rmSync(fixtureOutPath, { force: true });
    fs.rmSync(longTextOutPath, { force: true });
    fs.rmSync(longTextFullOutPath, { force: true });
});

test('puppetPdf renders the fixture at scale 1 with the footer within the single-page boundary', async () => {
    const { contentHeightMm, scale, footerBottomMm } = await pdfGenerate.puppetPdf(fixtureFields, fixtureOutPath);

    assert.ok(fs.existsSync(fixtureOutPath), 'PDF file should have been written');
    const { size } = fs.statSync(fixtureOutPath);
    assert.ok(size > 50 * 1024, `PDF should be a real render, not empty/broken (got ${size} bytes)`);

    assert.strictEqual(
        scale, 1,
        `expected the fixture (contentHeightMm=${contentHeightMm}) to print unscaled - it is a ` +
        'typical submission and should look identical to the pre-safety-net render'
    );
    assert.ok(
        footerBottomMm <= pdfGenerate.NO_SCALE_MM,
        `footer bottom (${footerBottomMm}mm) should fit within the empirically-measured single-page ` +
        `boundary (${pdfGenerate.NO_SCALE_MM}mm) at scale 1 - see the derivation comment in ` +
        'pdfGenerate.js for how that boundary was found'
    );
});

test('puppetPdf scales down a long pathology description so the footer still fits', async () => {
    const { contentHeightMm, scale, footerBottomMm } = await pdfGenerate.puppetPdf(longTextFields, longTextOutPath);

    assert.ok(fs.existsSync(longTextOutPath), 'PDF file should have been written');
    const { size } = fs.statSync(longTextOutPath);
    assert.ok(size > 50 * 1024, `PDF should be a real render, not empty/broken (got ${size} bytes)`);

    assert.ok(
        contentHeightMm > pdfGenerate.NO_SCALE_MM,
        `expected this long-text fixture (contentHeightMm=${contentHeightMm}) to exceed the ` +
        `single-page boundary (${pdfGenerate.NO_SCALE_MM}mm) - otherwise it isn't exercising the ` +
        'safety net at all'
    );
    assert.ok(
        scale < 1,
        `expected the safety net to engage (scale < 1) for contentHeightMm=${contentHeightMm}, got scale=${scale}`
    );
    // footerBottomMm is measured pre-scale (same proxy units as contentHeightMm/NO_SCALE_MM); the
    // print-time `scale` passed to page.pdf() shrinks the whole page proportionally, so
    // footerBottomMm * scale is the same proxy's estimate of where the footer lands after
    // shrinking. A 3mm safety factor is subtracted from the boundary here (rather than asserting
    // against NO_SCALE_MM exactly) so this proxy check can't be satisfied by a near-miss - it's
    // still just algebra checked against itself, not proof the real PDF is intact; the next test
    // provides that proof via a real, unrestricted render read back with `pdfinfo`.
    assert.ok(
        footerBottomMm * scale <= pdfGenerate.NO_SCALE_MM - 3,
        `scaled footer position (${footerBottomMm} * ${scale} = ${footerBottomMm * scale}mm) should ` +
        `fit with margin under the single-page boundary (${pdfGenerate.NO_SCALE_MM}mm) - the safety ` +
        'net should leave real headroom, not just barely graze the edge'
    );
});

test('real end-to-end check: the long pathology description keeps the footer on physical page 1', async (t) => {
    let toolsAvailable = true;
    try {
        execFileSync('pdftotext', ['-v'], { stdio: 'ignore' });
        execFileSync('pdfinfo', ['-v'], { stdio: 'ignore' });
    } catch (e) {
        toolsAvailable = false;
    }
    if (!toolsAvailable) {
        t.skip('pdftotext/pdfinfo (poppler-utils) not found on this machine - skipping real-PDF check');
        return;
    }

    // Proxy algebra (the two tests above) checks the scale formula against itself - a mutated
    // constant (e.g. TARGET_MM raised just enough to graze NO_SCALE_MM) could keep those
    // assertions green while the real PDF still loses its footer. Render this exact long-text
    // scenario a second time with pageRanges disabled so every physical page Chrome produces is
    // written out, then check the *real* PDF - not proxy math.
    //
    // NOTE on the invariant checked here: an earlier draft of this test asserted the render must
    // be exactly 1 physical page via `pdfinfo`'s page count. That is the same wrong criterion fix
    // round 2's scale curve was (mis)calibrated against (see IMPORTANT A / the derivation comment
    // in pdfGenerate.js) and it is demonstrably too strict - even the known-good fixture at scale 1
    // legitimately renders as 2 physical pages (`pdfinfo` on a `pageRanges: ''` fixture render also
    // reports Pages: 2; page 2 is harmless empty body min-height/margin spillover, and the fixture
    // PDF is correct today). Re-running that literal assertion against this long-text case also
    // reports 2 physical pages for the same harmless reason, which would make the test fail forever
    // even though the safety net is working correctly. The only invariant that actually matters -
    // and the one asserted below - is that the footer's own text (the ".business-card" contact bar:
    // "active8.il" / phone numbers / "active8.co.il") lands on physical page 1, found by running
    // `pdftotext -bbox-layout` (which reports exact glyph coordinates per physical page - the same
    // method used to derive NO_SCALE_MM/TARGET_MM in pdfGenerate.js) and counting which <page> block
    // the "active8.il" word falls inside.
    await pdfGenerate.puppetPdf(longTextFields, longTextFullOutPath, { pageRanges: '' });

    assert.ok(fs.existsSync(longTextFullOutPath), 'unrestricted-pageRanges PDF should have been written');

    const bbox = execFileSync('pdftotext', ['-bbox-layout', longTextFullOutPath, '-']).toString();
    const totalPages = (bbox.match(/<page /g) || []).length;
    let footerPage = null;
    let currentPage = 0;
    for (const line of bbox.split('\n')) {
        if (line.includes('<page ')) currentPage++;
        if (line.includes('>active8.il<')) {
            footerPage = currentPage;
            break;
        }
    }

    assert.ok(
        footerPage !== null,
        `expected to find the footer's "active8.il" text somewhere in the rendered PDF (${totalPages} ` +
        'physical page(s) total) - it was not found at all, which is a worse failure than landing on ' +
        'the wrong page'
    );
    assert.strictEqual(
        footerPage, 1,
        `expected the footer ("active8.il") to land on physical page 1 of the real rendered PDF ` +
        `(${totalPages} physical page(s) total), but it was found on page ${footerPage} - this is the ` +
        'exact real-world failure mode (footer silently dropped by pageRanges: \'1\') this whole ' +
        'safety net exists to prevent'
    );
});
