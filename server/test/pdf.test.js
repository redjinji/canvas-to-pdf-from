// server/test/pdf.test.js
// Regression guard for the Task 7 (Puppeteer 25 upgrade) A4-overflow bug: Chromium's default
// line-height for the Alef webfont grew slightly across the Puppeteer 17 -> 25 (Chromium 106 ->
// 151) upgrade, which - compounded across every stacked text block on the page - was enough to
// push the footer (business contact bar: active8.il / phone numbers / active8.co.il) onto a
// second PDF page that `pageRanges: '1'` then silently discarded. Fixed via an explicit
// `line-height` in server/final-form.html. This test renders the same fixture used for the
// Task 1 baseline and asserts the output still looks like a complete, single-page PDF.
//
// Threshold rationale: `contentHeightMm` (returned by puppetPdf, see the comment above its
// computation in server/pdfGenerate.js) is a *pre-print* proxy measured in 'screen' media before
// Chrome's printToPDF pipeline scales the page down to fit the A4 width - it runs well above the
// true ~292-297mm printed height, so it cannot be compared directly to 297. It is, however, a
// stable, deterministic value for this fixture: it measured ~326mm after the line-height fix and
// ~340mm before it (the broken state that lost the footer). 333mm sits roughly halfway between
// those two measured points, giving headroom in both directions to absorb minor environment
// variance while still catching a real regression before it silently reoccurs.
const { test, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const pdfGenerate = require('../pdfGenerate');
const fields = require('./fixtures/sample-fields.json');

const CONTENT_HEIGHT_MM_MAX = 333;
const outPath = path.join('server', 'pdfs', '_pdf.test.tmp.pdf');

after(() => {
    fs.rm(outPath, { force: true }, () => {});
});

test('puppetPdf renders a single-page PDF with the footer intact (no A4 overflow regression)', async () => {
    const { contentHeightMm } = await pdfGenerate.puppetPdf(fields, outPath);

    assert.ok(fs.existsSync(outPath), 'PDF file should have been written');
    const { size } = fs.statSync(outPath);
    assert.ok(size > 50 * 1024, `PDF should be a real render, not empty/broken (got ${size} bytes)`);

    assert.ok(
        contentHeightMm <= CONTENT_HEIGHT_MM_MAX,
        `content height grew to ${contentHeightMm}mm (max ${CONTENT_HEIGHT_MM_MAX}mm) - ` +
        `this is the same failure mode that pushed the footer off the printed page; ` +
        `see the comment at the top of this file`
    );
});
