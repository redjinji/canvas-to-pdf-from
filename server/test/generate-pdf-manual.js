// server/test/generate-pdf-manual.js
// Renders the PDF from the committed fixture, bypassing Google APIs.
const pdfGenerate = require('../pdfGenerate');
const fields = require('./fixtures/sample-fields.json');

pdfGenerate.puppetPdf(fields)
    .then(() => console.log('PDF written to server/pdfs/mypdf.pdf'))
    .catch(err => { console.error(err); process.exit(1); });
