// server/test/template.test.js
// Task 5 - "reversed marking" (סימון הפוך בטופס שנשלח אל מול הטופס במערכת).
//
// Root cause: the form asks the agent "קשת קשיחה?" (is the arch rigid?) and the submitted כן/לא
// answer was copied verbatim into the PDF - but under the heading "ניתן לבצע הטבעה פעילה ישירה"
// (direct active molding is possible), which means the *opposite* clinical fact. So an agent who
// marked כן (rigid arch) produced a PDF stating "כן, ניתן לבצע הטבעה" - read by everyone downstream
// as לא-קשיחה. The value was never flipped anywhere in code; the heading inverted its meaning.
//
// The fix (confirmed with Sahar): the PDF prints the answer under the exact wording the agent
// answered - "קשת קשיחה: כן/לא" - so form and PDF can never disagree again.
const { test } = require('node:test');
const assert = require('node:assert');
const htmlTemplate = require('angular-template');
const path = require('path');
const fixtureFields = require('./fixtures/sample-fields.json');

const TEMPLATE_PATH = path.join(__dirname, '..', 'final-form.html');

// The same render call pdfGenerate.puppetPdf feeds to Puppeteer, flattened to visible text.
// angular-template emits the template's own static text as numeric HTML entities (&#x5E7;...)
// while interpolated {{field}} values stay literal, so entities must be decoded before matching -
// otherwise assertions against Hebrew template text silently match nothing.
function renderedText(fields) {
    const html = htmlTemplate(TEMPLATE_PATH, fields);
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
        .replace(/\s+/g, ' ');
}

test('the keshet answer appears in the PDF under the same wording the agent marked ("קשת קשיחה")', () => {
    assert.strictEqual(fixtureFields.keshet, 'כן',
        'fixture precondition: this test assumes the sample submission marked קשת קשיחה = כן');

    const text = renderedText(fixtureFields);

    assert.ok(
        text.includes('קשת קשיחה: כן'),
        'expected the PDF text to state the answer under the form\'s own wording ("קשת קשיחה: כן") ' +
        'so the sent form matches what the agent marked in the system'
    );
    assert.ok(
        !text.includes('ניתן לבצע הטבעה פעילה ישירה'),
        'the old heading "ניתן לבצע הטבעה פעילה ישירה" means the opposite of "קשת קשיחה", which is ' +
        'exactly the reversed-marking bug - it must no longer appear in the PDF'
    );
});
