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
// This file exercises both the proxy math and, in tests 3 and 4, real end-to-end checks. Proxy
// algebra alone cannot catch a miscalibrated constant - in fact test 2's scaled-footer assertion
// reduces to a constant check, because `footerBottomMm` always equals `contentHeightMm` (the footer
// is the last in-flow element), so it is really just `TARGET_MM <= NO_SCALE_MM - 3`. Only the
// real-PDF tests are render-sensitive. Each of those renders a submission with pageRanges disabled
// (so every physical page Chrome produces is written out) and reads the result back with
// `pdftotext -bbox-layout`, asserting the footer's own text lands on physical page 1 - the only
// invariant that matters. They cover two magnitudes deliberately:
//   test 3 (~336mm) - a realistic long submission, the reviewer's original 3-line-patalog repro.
//   test 4 (~401mm) - inside the region where the previous TARGET_MM=324 calibration empirically
//     LOST the footer (bisected max safe scale 0.80508 there vs 0.8071 applied by 324). Fix round
//     3's suite had no case in this failure region at all, so a too-high TARGET_MM went undetected;
//     this test exists specifically to close that gap and fails if TARGET_MM is raised back to 324.
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
const veryLongTextFullOutPath = path.join(os.tmpdir(), 'canvas-to-pdf-test-verylongtext-full.pdf');

// Reproduces the reviewer's finding: a realistic multi-line patalog ("describe pain location /
// pathology") field alone, with no other change, pushes content well past the single-page
// boundary. This ~200-character Hebrew description wraps to 3 lines in the form's answer column,
// matching the reviewer's "3-line patalog field" repro. Measures contentHeightMm ~336.
const PATHOLOGY_TEXT = 'דלקת בגיד אכילס בעקב שמאל עם הגבלה בטווח התנועה של הקרסול, כאבים משמעותיים ' +
    'בהליכה ובעמידה ממושכת, נפיחות קלה באזור העקב, רגישות במישוש, היסטוריה של פציעות ' +
    'חוזרות באזור זה בשנתיים האחרונות הדורשות מעקב';

const longTextFields = Object.assign({}, fixtureFields, { patalog: PATHOLOGY_TEXT });

// A verbose-but-permitted submission: ~1,000 characters of pathology text plus long activity and
// insurance answers. Measures contentHeightMm ~401.5 - inside the region where TARGET_MM=324 was
// empirically shown to lose the footer (see the file header and the derivation comment in
// pdfGenerate.js). Nothing about this is synthetic-only: the frontend's free-text fields accept up
// to 10,000 characters each, so this is ~1/10th of what a user can actually submit today.
const LONG_ACTIVITY = 'ריצת שטח ארוכה שלוש פעמים בשבוע, אימוני כוח בחדר כושר, שחייה וטיולים ארוכים בסופי שבוע';
const LONG_INSURANCE = 'כללית מושלם פלטינום כולל ביטוח משלים והשתתפות עצמית מופחתת לטיפולי פיזיותרפיה';
const veryLongTextFields = Object.assign({}, fixtureFields, {
    patalog: Array(5).fill(PATHOLOGY_TEXT).join(' '),
    activity: LONG_ACTIVITY + ' ' + LONG_ACTIVITY,
    insurance: LONG_INSURANCE + ' ' + LONG_INSURANCE,
});

// `pdftotext` (poppler-utils) is what the real-PDF tests read glyph coordinates with. It is the
// only external binary they need.
function pdftotextAvailable() {
    try {
        execFileSync('pdftotext', ['-v'], { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// Renders `fields` with pageRanges disabled (every physical page written out) and returns which
// physical page the footer's ".business-card" contact text ("active8.il") landed on, plus the total
// page count. `pdftotext -bbox-layout` emits one <page ...> block per physical page with exact
// glyph coordinates inside - the same method used to derive NO_SCALE_MM/TARGET_MM in pdfGenerate.js.
async function renderAndFindFooterPage(fields, outPath) {
    const result = await pdfGenerate.puppetPdf(fields, outPath, { pageRanges: '' });
    assert.ok(fs.existsSync(outPath), 'unrestricted-pageRanges PDF should have been written');

    const bbox = execFileSync('pdftotext', ['-bbox-layout', outPath, '-']).toString();
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
    return Object.assign({ footerPage, totalPages }, result);
}

after(() => {
    fs.rmSync(fixtureOutPath, { force: true });
    fs.rmSync(longTextOutPath, { force: true });
    fs.rmSync(longTextFullOutPath, { force: true });
    fs.rmSync(veryLongTextFullOutPath, { force: true });
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
    // against NO_SCALE_MM exactly) so this proxy check can't be satisfied by a near-miss.
    //
    // Be clear about how weak this assertion is on its own: because the footer is the last in-flow
    // element, footerBottomMm always equals contentHeightMm, so once the safety net engages this
    // reduces algebraically to the constant check `TARGET_MM <= NO_SCALE_MM - 3` and is not
    // sensitive to what the renderer actually produced. It is kept as a cheap sanity check on the
    // constants; the real proof lives in tests 3 and 4, which read back genuinely rendered PDFs
    // with `pdftotext -bbox-layout`.
    assert.ok(
        footerBottomMm * scale <= pdfGenerate.NO_SCALE_MM - 3,
        `scaled footer position (${footerBottomMm} * ${scale} = ${footerBottomMm * scale}mm) should ` +
        `fit with margin under the single-page boundary (${pdfGenerate.NO_SCALE_MM}mm) - the safety ` +
        'net should leave real headroom, not just barely graze the edge'
    );
});

test('real end-to-end check: the long pathology description keeps the footer on physical page 1', async (t) => {
    if (!pdftotextAvailable()) {
        t.skip('pdftotext (poppler-utils) not found on this machine - skipping real-PDF check');
        return;
    }

    // Proxy algebra (the two tests above) checks the scale formula against itself - and in test 2's
    // case degenerates to a constant comparison (see the file header), so a miscalibrated TARGET_MM
    // can keep it green while the real PDF loses its footer. Render this exact long-text scenario a
    // second time with pageRanges disabled and check the *real* PDF instead.
    //
    // NOTE on the invariant checked here: an earlier draft of this test asserted the render must be
    // exactly 1 physical page via `pdfinfo`'s page count. That is the same wrong criterion fix
    // round 2's scale curve was (mis)calibrated against (see the derivation comment in
    // pdfGenerate.js) and it is demonstrably too strict - even the known-good fixture at scale 1
    // legitimately renders as 2 physical pages (page 2 is harmless empty body min-height/margin
    // spillover, and that fixture PDF is correct today), so the literal assertion would fail forever
    // even while the safety net works. What is asserted instead is the invariant that actually
    // matters: the footer's own text (the ".business-card" contact bar: "active8.il" / phone
    // numbers / "active8.co.il") lands on physical page 1.
    const { footerPage, totalPages, contentHeightMm, scale } =
        await renderAndFindFooterPage(longTextFields, longTextFullOutPath);

    assert.ok(
        footerPage !== null,
        `expected to find the footer's "active8.il" text somewhere in the rendered PDF (${totalPages} ` +
        'physical page(s) total) - it was not found at all, which is a worse failure than landing on ' +
        'the wrong page'
    );
    assert.strictEqual(
        footerPage, 1,
        `expected the footer ("active8.il") to land on physical page 1 of the real rendered PDF ` +
        `(contentHeightMm=${contentHeightMm}, scale=${scale}, ${totalPages} physical page(s) total), ` +
        `but it was found on page ${footerPage} - this is the exact real-world failure mode (footer ` +
        'silently dropped by pageRanges: \'1\') this whole safety net exists to prevent'
    );
});

test('real end-to-end check: a ~1,000-char pathology description (past where TARGET_MM=324 failed) keeps the footer on physical page 1', async (t) => {
    if (!pdftotextAvailable()) {
        t.skip('pdftotext (poppler-utils) not found on this machine - skipping real-PDF check');
        return;
    }

    // This case exists because fix round 3's suite had NO coverage in the region where its own
    // calibration broke. Bisecting the true maximum footer-on-page-1 scale at this content height
    // (~401.5mm) gives 0.80508, while TARGET_MM=324 applies 0.8071 - over the line, footer lost on
    // page 2. TARGET_MM=318 applies 0.7921, inside the safe region. So this test is the direct
    // guard on the constant: raising TARGET_MM back to 324 makes it fail (verified by mutation),
    // whereas the proxy assertions in tests 1-2 stay green under that same mutation.
    const { footerPage, totalPages, contentHeightMm, scale } =
        await renderAndFindFooterPage(veryLongTextFields, veryLongTextFullOutPath);

    assert.ok(
        contentHeightMm > 390,
        `this case must stay in the failure region that motivated it (expected contentHeightMm > 390, ` +
        `got ${contentHeightMm}) - if the template changes enough to drop it below that, the test is ` +
        'no longer guarding what it was written to guard and the text should be lengthened again'
    );
    assert.ok(
        footerPage !== null,
        `expected to find the footer's "active8.il" text somewhere in the rendered PDF (${totalPages} ` +
        'physical page(s) total) - it was not found at all, which is a worse failure than landing on ' +
        'the wrong page'
    );
    assert.strictEqual(
        footerPage, 1,
        `expected the footer ("active8.il") to land on physical page 1 of the real rendered PDF ` +
        `(contentHeightMm=${contentHeightMm}, scale=${scale}, ${totalPages} physical page(s) total), ` +
        `but it was found on page ${footerPage} - TARGET_MM is calibrated too high for content this ` +
        'long; see the fix round 4 derivation comment in pdfGenerate.js'
    );
});
