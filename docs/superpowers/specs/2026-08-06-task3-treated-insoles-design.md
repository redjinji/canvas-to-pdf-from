# Task 3 — "האם מטופל במדרסים?" conditional question + "סוג המדרס המומלץ" (design)

**Date:** 2026-08-06
**Requested by:** Sahar (client), clarified via Gavriel
**Status:** Approved by Gavriel (conversation, 2026-08-06)

## Requirement

Sahar's request, after clarification rounds:

1. New question **"האם מטופל במדרסים?"** with radio options כן / לא.
2. On **כן**, two additional free-text fields are revealed: **"איזה סוג?"** and **"כמה זמן?"**
   (two separate fields — Gavriel's decision; both optional).
3. Placement: in the **פרטי לקוח** screen, visually after מקור הגעה and before סוג מדרס
   (Sahar: "בעמודה השמאלית אחרי מקור הגעה ולפני סוג המדרס").
4. Bonus request ("בסוג המדרס רצוי להוסיף סוג המדרס המומלץ"): relabel the existing
   **"סוג מדרס"** select to **"סוג המדרס המומלץ"** and print its value in the PDF —
   today the value is collected but never rendered anywhere in the PDF (verified: no
   `midras-type` interpolation exists in `server/final-form.html`).

## Layout decision (full-width row)

The פרטי לקוח fields flow two-per-row in RTL (odd DOM positions → right column, even →
left column). Verified in the rendered app:

| Row | Right column | Left column |
|-----|--------------|-------------|
| 2 | מספר טלפון | מקור הגעה |
| 3 | ביטוח | סוג מדרס |

Inserting a half-width field between מקור הגעה and סוג מדרס would flip the column of every
subsequent field. Therefore the new question is a **full-width row** between row 2 and
row 3: reading top-down it sits after מקור הגעה and before סוג המדרס, and no existing
field moves. The radio and the two revealed inputs share that band (wrapping as needed on
mobile). Mock approved by Gavriel.

New field order in `FORM_ELEMENTS` (פרטי לקוח `customerDetails`):
… phone → referred → **treatedInsoles (+ insolesType, insolesDuration)** → insurance →
midrasType → idNumber …

## Frontend design (Option A — generic `showIf`)

- **`ICustomerDetails`** gains `showIf?: { field: string, equals: string }`.
  `simple-form.component` renders a field only when `parentForm.get(field).value === equals`.
  When a field transitions to hidden, its control value is **reset to `''`** so stale
  answers never submit (switching כן → לא clears both follow-ups).
- New entries in `form.service.ts` reuse the **existing** radio and input components —
  no new components:
  - radio `treatedInsoles`, label "האם מטופל במדרסים?", options כן / לא (stores the label
    string, same as קשת קשיחה).
  - input `insolesType`, label "איזה סוג?", `showIf: { field: 'treatedInsoles', equals: 'כן' }`, optional.
  - input `insolesDuration`, label "כמה זמן?", same `showIf`, optional.
- A layout class (via the existing `class` hook on `ICustomerDetails` /
  `[ngClass]="elem.class"`) makes these entries render as one full-width band; the two
  conditional inputs appear inline within it when revealed. Watch for the Task-6 lesson:
  revealed content growing a bottom-aligned flex cell can ride up under neighbors —
  verify at desktop and 375 px widths.
- **Rename** control `midras-type` → `midrasType` (its value must be interpolated in the
  PDF template, and angular-template would parse `{{midras-type}}` as subtraction).
  Nothing on the server references the old name (verified). Relabel the select to
  **"סוג המדרס המומלץ"**.
- All new controls flow to the server automatically (`sendForm` iterates
  `parentForm.value`).

## Server / PDF design

`server/final-form.html`, left details column (`.form-selections`), mirroring form order:

- After the מקור הגעה line:
  - `האם מטופל במדרסים: {{treatedInsoles}}`
  - an `ht-if`-guarded second line, shown only when either follow-up is non-empty:
    `סוג: {{insolesType}}, זמן: {{insolesDuration}}`
- After the ביטוח בריאות line: `סוג המדרס המומלץ: {{midrasType}}`.

`server/pdfGenerate.js` defaults the four new keys (`treatedInsoles`, `insolesType`,
`insolesDuration`, `midrasType`) to `''` when absent, so `/regenerateLastPdf` on an old
saved submission (and old fixtures) never hands `undefined` to the template.

## Testing

- **Frontend (vitest):** showIf reveal/hide + clear-on-hide behavior; the new question's
  presence and position; the "סוג המדרס המומלץ" relabel.
- **Server (`npm test`):** template regression test asserting the new PDF lines render
  with values, and that the conditional line disappears when both follow-ups are empty.
  Hebrew template text must be entity-decoded before asserting (known angular-template
  gotcha — see `renderedText` in `server/test/template.test.js`).
- Update `server/test/fixtures/sample-fields.json` with the new keys.

## Verification / rollout

Rebuild `charts6/dist` and commit it (served output). Deploy the branch to staging
(`git push staging task3-treated-insoles:main --force`), fixture-POST `/sendForm`, read
back `/latestpdf`, and eyeball the form at desktop + 375 px. PR to `master`; Gavriel
merges and decides on production deploy.

## Out of scope

Required-on-כן validation (fields are optional), any change to ביטוח, any new wizard
step or navigation change, writing submissions to Google Sheets.
