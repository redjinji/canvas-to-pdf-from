// Text-level regression tests over the rendered final-form.html (the HTML the PDF is printed from).
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

// The form's three capture slots show the agent, in this order: image0 natural standing,
// image1 bent-knee "power" stance, image2 toes-raised talus test - captions must match.
test('each submitted foot photo is captioned with the stance the agent actually photographed', () => {
    // The fixture's three images are byte-identical placeholders, so distinguishable markers are
    // injected per slot - the template interpolates them into each <figure>'s img src verbatim.
    const fields = Object.assign({}, fixtureFields, {
        image0: 'data:image/png;base64,MARKER-SLOT-0',
        image1: 'data:image/png;base64,MARKER-SLOT-1',
        image2: 'data:image/png;base64,MARKER-SLOT-2',
    });
    const html = htmlTemplate(TEMPLATE_PATH, fields);

    const figures = [...html.matchAll(/<figure><img src="([^"]+)">\s*<figcaption>([^<]+)<\/figcaption>/g)]
        .map(m => [m[1], m[2].trim()]);
    assert.deepStrictEqual(figures, [
        ['data:image/png;base64,MARKER-SLOT-0', 'Natural Standing Position'],
        ['data:image/png;base64,MARKER-SLOT-1', 'Power Position'],
        ['data:image/png;base64,MARKER-SLOT-2', 'Talus Natural Position'],
    ], 'each photo must be captioned with the stance shown in its capture slot (image0 = natural ' +
       'standing, image1 = bent-knee power stance, image2 = toes-raised talus test)');
});

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

test('a free-text מקור הגעה value is printed verbatim in the PDF', () => {
    const fields = Object.assign({}, fixtureFields, { referred: 'המלצה מרופא' });
    const text = renderedText(fields);
    assert.ok(
        text.includes('מקור הגעה: המלצה מרופא'),
        'expected the PDF text to print the typed free-text source verbatim under "מקור הגעה"'
    );
});
