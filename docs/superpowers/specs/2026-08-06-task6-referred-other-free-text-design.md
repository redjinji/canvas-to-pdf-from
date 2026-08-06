# Task 6 — Free text for אחר on מקור הגעה (source/origin field)

**Date:** 2026-08-06
**Status:** Approved by Gavriel
**Branch:** `task6-referred-other-free-text`

## Goal

When the field agent picks אחר in the מקור הגעה dropdown, let them type a free-text
source instead. The typed value must be what appears in the generated PDF.

## Context / corrections to the task doc

- The task doc (`Midras-tasks.md`, Task 6) says the field is a radio with an
  `other?: boolean` flag already scaffolded. In reality **מקור הגעה is a select**
  (`charts6/src/app/form/form.service.ts`, name `referred`, options
  מזדמן / פרסום / מטופל שלי / אחר). The `other` scaffolding exists only on the radio
  component and is unused by this field.
- The task doc says the value must flow "into the PDF and the sheet". Submissions do
  **not** write to any Google Sheet (the Sheet is read-only for login). The real
  acceptance criterion is the PDF.
- Scope decision (Gavriel): **only מקור הגעה**. The ביטוח (insurance) select also has
  an אחר option, but it is out of scope; the mechanism is generic so enabling it later
  is a one-line flag.

## Design (approved: "select + reveal")

### Component behavior

- `ISelectOption` (in `charts6/src/app/form/form-elements-components/form-interface.ts`)
  gains `other?: boolean`. It is set only on the אחר option of `referred` in
  `form.service.ts`.
- When a select has an `other`-flagged option, `SelectComponent` switches to a
  **resolved-value mode**:
  - The visible `<select>` and a revealed text input bind to internal controls.
  - The component writes a single resolved value into the real parent-form control
    (`referred`): the chosen option's text normally, or the typed free text when אחר
    is selected.
  - The text input is only visible while אחר is selected, rendered directly under the
    dropdown, styled like the existing form inputs (RTL inherited).
- Selects **without** the flag keep the exact current direct `formControlName`
  binding — no behavior change for ביטוח, סוג מדרס, etc.

### Edge cases

- אחר selected, text empty → submit the plain string `אחר` (the field is not required
  today; that stays).
- Text typed, then a different option selected → that option's value is submitted; the
  typed text is ignored but kept in the input in case the user switches back.
- PDF shows **just the free text** (e.g. `מקור הגעה: המלצה מרופא`), not `אחר - <text>`
  (Gavriel's choice).

### Data flow (unchanged outside the component)

`referred` control holds the final string → generic `sendForm` FormData loop
(`midras-form.component.ts`) → `server/assets/testMeText.json` → `{{referred}}` at
`server/final-form.html:276` → PDF. **No server or template changes.**

### Testing

- Vitest specs for `SelectComponent`: unchanged behavior without the flag;
  input revealed on אחר; typed text lands in the parent control; empty-text fallback
  to `אחר`; switching away restores the option value.
- One server regression in `server/test/template.test.js`: a fields fixture with a
  free-text `referred` value renders that text in the output HTML.
- Rebuild and commit `charts6/dist` (the server serves the committed build).

### Delivery

Branch → PR to `master` (Gavriel merges). Staging verification via
`git push staging task6-referred-other-free-text:main --force` (Gavriel runs the push).
