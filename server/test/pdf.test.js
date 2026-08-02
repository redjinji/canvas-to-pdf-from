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
//  2. A dynamic scale-to-fit safety net (see the NO_SCALE_MM / SCALE_TARGET_MM / SCALE_POWER
//     derivation comment in pdfGenerate.js) shrinks the printed page whenever measured content
//     exceeds the true single-page boundary, so longer real-world submissions (extra lines in
//     patalog/comments) degrade to a slightly smaller single page instead of silently losing the
//     footer - which a code reviewer found still happened with only the line-height fix and a
//     static content-height *assertion* (no correction), since realistic submissions have only
//     ~3.3mm of headroom past the fixture.
//
// This file exercises both: the fixture case proves typical submissions are unaffected (scale 1,
// footer comfortably within the boundary), and the long-text case reproduces the reviewer's
// 3-line-patalog scenario and proves the safety net actually engages and keeps the footer on the
// page.
const { test, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const pdfGenerate = require('../pdfGenerate');
const fixtureFields = require('./fixtures/sample-fields.json');

const fixtureOutPath = path.join(os.tmpdir(), 'canvas-to-pdf-test-fixture.pdf');
const longTextOutPath = path.join(os.tmpdir(), 'canvas-to-pdf-test-longtext.pdf');

after(() => {
    fs.rmSync(fixtureOutPath, { force: true });
    fs.rmSync(longTextOutPath, { force: true });
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
    // Reproduces the reviewer's finding: a realistic multi-line patalog ("describe pain location /
    // pathology") field alone, with no other change, pushes content well past the single-page
    // boundary. This ~200-character Hebrew description wraps to 3 lines in the form's answer
    // column, matching the reviewer's "3-line patalog field" repro.
    const longTextFields = Object.assign({}, fixtureFields, {
        patalog: 'דלקת בגיד אכילס בעקב שמאל עם הגבלה בטווח התנועה של הקרסול, כאבים משמעותיים ' +
            'בהליכה ובעמידה ממושכת, נפיחות קלה באזור העקב, רגישות במישוש, היסטוריה של פציעות ' +
            'חוזרות באזור זה בשנתיים האחרונות הדורשות מעקב',
    });

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
    // shrinking. Asserting it against NO_SCALE_MM - the same boundary a scale-1 page must stay
    // under to keep its footer on page 1 - reasons about the scaled page the same way an unscaled
    // one is judged. (This scale was also independently verified against real, unrestricted
    // Puppeteer renders bisected on page.pdf()'s `scale` option - see the derivation comment in
    // pdfGenerate.js - and against a real render of this exact scenario read back visually.)
    assert.ok(
        footerBottomMm * scale <= pdfGenerate.NO_SCALE_MM,
        `scaled footer position (${footerBottomMm} * ${scale} = ${footerBottomMm * scale}mm) should ` +
        `fit within the single-page boundary (${pdfGenerate.NO_SCALE_MM}mm) - the safety net should ` +
        'leave enough margin that the footer survives, not just barely graze the edge'
    );
});
