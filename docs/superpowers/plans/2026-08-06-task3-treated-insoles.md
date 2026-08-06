# Task 3 — Treated-Insoles Conditional Question Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "האם מטופל במדרסים?" כן/לא question with two conditionally revealed free-text fields (איזה סוג? / כמה זמן?) to the פרטי לקוח screen, relabel "סוג מדרס" to "סוג המדרס המומלץ", and print all of it in the generated PDF.

**Architecture:** A generic `showIf` visibility mechanism on `ICustomerDetails` (evaluated by `simple-form.component`, which also clears hidden controls so stale answers never submit) + three plain data entries in `form.service.ts` reusing existing radio/input components. Server side: a new exported `prepareTemplateFields()` in `pdfGenerate.js` defaults the new keys and derives `insolesDetail`; `final-form.html` prints the new lines in the left details column.

**Tech Stack:** Angular 22 (`charts6/`, vitest via `ng test`), Express backend (plain JS CommonJS, `node:test` via `npm test`), angular-template + Puppeteer for the PDF.

**Spec:** `docs/superpowers/specs/2026-08-06-task3-treated-insoles-design.md`

## Global Constraints

- **Never commit or push to `master`.** All work happens on branch `task3-treated-insoles` (already created; spec committed there). The user merges PRs himself.
- The form definition is **duplicated**: Angular form (`charts6/`) AND PDF template (`server/final-form.html`). Every field change touches both.
- New field/control names (used verbatim everywhere): `treatedInsoles`, `insolesType`, `insolesDuration`; rename existing control `midras-type` → `midrasType` (keep the DOM id `midras-type` as-is). Derived server-only field: `insolesDetail`.
- Exact Hebrew copy: question label `האם מטופל במדרסים?`, options `כן` / `לא`, follow-up labels `איזה סוג?` and `כמה זמן?`, select relabel `סוג המדרס המומלץ`, PDF lines `האם מטופל במדרסים: `, `סוג: `, `זמן: `, `סוג המדרס המומלץ: `.
- The two follow-up fields are **optional** (no validators), and are **cleared** whenever the controlling answer is not `כן`.
- **angular-template gotchas** (both verified empirically): (1) a `{{field}}` whose key is absent from the fields object **throws** — never render the template without the defaults from `prepareTemplateFields`; (2) Hebrew string literals inside `ht-if` expressions are entity-encoded and **never match** — only use `.length` checks in `ht-if`, never `x === 'כן'`. Also `{{midras-type}}` would parse as subtraction — hence the rename.
- Tests asserting Hebrew *template* text must entity-decode first (use the existing `renderedText` helper in `server/test/template.test.js`).
- The served frontend is the **committed** `charts6/dist/charts6/` — frontend changes are invisible until `npm run build` output is committed (Task 5).
- Backend tests: `npm test` from repo root. Frontend tests: `ng test` from `charts6/` (vitest; single spec: `ng test --include='**/name.spec.ts'`).

## File Structure

- `server/pdfGenerate.js` — add exported `prepareTemplateFields(fields)`; call it in `puppetPdf` before rendering.
- `server/final-form.html` — three new `<p>` lines in `.form-selections` left column.
- `server/test/template.test.js` — route `renderedText` through `prepareTemplateFields`; 4 new tests.
- `server/test/fixtures/sample-fields.json` — add the 4 new submission keys.
- `charts6/src/app/form/form-elements-components/form-interface.ts` — `IShowIf`, `showIf?` on `ICustomerDetails`.
- `charts6/src/app/form/form-elements-components/simple-form.component.ts` / `.html` / `.scss` — visibility + clearing logic; `full-row` layout class.
- `charts6/src/app/form/form-elements-components/simple-form.component.spec.ts` — **new** spec for the showIf engine.
- `charts6/src/app/form/form.service.ts` — three new entries; rename/relabel the midras select.
- `charts6/src/app/form/form.service.spec.ts` — data-shape tests.
- `charts6/dist/` — rebuilt and committed.

---

### Task 1: Server — field preparation + PDF template lines

**Files:**
- Modify: `server/pdfGenerate.js` (add method near `puppetPdf`, call it at the top of `puppetPdf`)
- Modify: `server/final-form.html:269-270` (left details column)
- Modify: `server/test/fixtures/sample-fields.json`
- Test: `server/test/template.test.js`

**Interfaces:**
- Consumes: nothing new — existing `htmlTemplate`, fixture, `renderedText`.
- Produces: `pdfGenerate.prepareTemplateFields(fields)` — mutates and returns `fields`; guarantees string values for `treatedInsoles`, `insolesType`, `insolesDuration`, `midrasType` and sets `insolesDetail` (e.g. `'סוג: אקטיב פלקס, זמן: שנתיים'`, or `''` when both parts empty). Task 4/5 rely on the template printing `האם מטופל במדרסים: <val>`, the detail line, and `סוג המדרס המומלץ: <val>`.

- [ ] **Step 1: Add the new keys to the fixture**

In `server/test/fixtures/sample-fields.json`, add four keys (anywhere at the top level, e.g. after `"referred"`):

```json
    "treatedInsoles": "כן",
    "insolesType": "אקטיב פלקס",
    "insolesDuration": "שנתיים",
    "midrasType": "אקטיבי",
```

- [ ] **Step 2: Route `renderedText` through the (not yet existing) prep function and write the failing tests**

In `server/test/template.test.js`, add after the existing requires:

```js
const pdfGenerate = require('../pdfGenerate');
```

Change the first line of `renderedText` so every template render in this file gets the same field prep the real PDF path gets (`Object.assign` copy — `prepareTemplateFields` mutates, and the shared fixture must stay pristine):

```js
    const html = htmlTemplate(TEMPLATE_PATH, pdfGenerate.prepareTemplateFields(Object.assign({}, fields)));
```

Append these four tests:

```js
test('the treated-insoles answer and its follow-up details appear in the PDF', () => {
    const text = renderedText(fixtureFields);
    assert.ok(text.includes('האם מטופל במדרסים: כן'),
        'expected the PDF to state the treated-insoles answer under the form\'s own wording');
    assert.ok(text.includes('סוג: אקטיב פלקס'),
        'expected the insole-type follow-up to be printed');
    assert.ok(text.includes('זמן: שנתיים'),
        'expected the duration follow-up to be printed');
});

test('the follow-up detail line disappears when both follow-ups are empty', () => {
    const text = renderedText(Object.assign({}, fixtureFields,
        { treatedInsoles: 'לא', insolesType: '', insolesDuration: '' }));
    assert.ok(text.includes('האם מטופל במדרסים: לא'),
        'the yes/no answer itself must still be printed');
    assert.ok(!text.includes('סוג: ') && !text.includes('זמן: '),
        'an empty follow-up pair must not leave an orphan "סוג:"/"זמן:" line in the PDF');
});

test('a legacy submission without the Task-3 keys still renders (regenerateLastPdf safety)', () => {
    const legacy = Object.assign({}, fixtureFields);
    delete legacy.treatedInsoles;
    delete legacy.insolesType;
    delete legacy.insolesDuration;
    delete legacy.midrasType;
    const text = renderedText(legacy);
    assert.ok(!text.includes('האם מטופל במדרסים'),
        'a submission predating the question must not print an empty question line');
    assert.ok(!text.includes('סוג המדרס המומלץ'),
        'a submission predating the midrasType field must not print an empty recommendation line');
});

test('the recommended midras type is printed in the PDF', () => {
    const text = renderedText(fixtureFields);
    assert.ok(text.includes('סוג המדרס המומלץ: אקטיבי'),
        'the agent\'s selected midras type was previously collected but silently dropped from the PDF');
});
```

- [ ] **Step 3: Run the suite to verify the new tests fail**

Run from repo root: `npm test`
Expected: the four new tests FAIL (`pdfGenerate.prepareTemplateFields is not a function`); all pre-existing tests still pass.

- [ ] **Step 4: Implement `prepareTemplateFields` in `server/pdfGenerate.js`**

Add as a new method on the exported object, directly above `puppetPdf`:

```js
	// Submissions saved before Task 3 (and old test fixtures) lack these keys, and
	// angular-template throws on any interpolated key that is absent - so default them
	// before every render. insolesDetail is derived here rather than tested in the
	// template because ht-if cannot compare against Hebrew literals (the template source
	// is entity-encoded, so treatedInsoles === 'כן' never matches).
	prepareTemplateFields: function (fields) {
		for (const key of ['treatedInsoles', 'insolesType', 'insolesDuration', 'midrasType']) {
			if (fields[key] === undefined) fields[key] = '';
		}
		fields.insolesDetail = [
			fields.insolesType && `סוג: ${fields.insolesType}`,
			fields.insolesDuration && `זמן: ${fields.insolesDuration}`,
		].filter(Boolean).join(', ');
		return fields;
	},
```

In `puppetPdf`, immediately before `const htmlToParce = htmlTemplate(__dirname + '/final-form.html', fields);` add:

```js
			this.prepareTemplateFields(fields);
```

(`puppetPdf` is always invoked as a method — `pdfGenerate.puppetPdf(...)` / `this.puppetPdf(...)` — so `this` is the exported object.)

- [ ] **Step 5: Add the template lines to `server/final-form.html`**

The left details column currently reads (lines 268-270):

```html
		<p class="title"><span class="lable">קשת קשיחה: </span><span>{{keshet}}</span></p>
		<p><span class="lable">מקור הגעה: </span><span>{{referred}}</span></p>
		<p><span class="lable">ביטוח בריאות: </span><span>{{insurance}}</span></p>
```

Insert after the מקור הגעה line (mirroring the form's field order):

```html
		<p ht-if="treatedInsoles.length != 0"><span class="lable">האם מטופל במדרסים: </span><span>{{treatedInsoles}}</span></p>
		<p ht-if="insolesDetail.length != 0"><span>{{insolesDetail}}</span></p>
```

Insert after the ביטוח בריאות line:

```html
		<p ht-if="midrasType.length != 0"><span class="lable">סוג המדרס המומלץ: </span><span>{{midrasType}}</span></p>
```

- [ ] **Step 6: Run the full backend suite**

Run from repo root: `npm test`
Expected: ALL tests pass (17 = 13 existing + 4 new). The PDF-fit tests re-render real PDFs with the now-taller left column — if a fit test fails, stop and report; do not tweak the scale net without discussion.

- [ ] **Step 7: Commit**

```bash
git add server/pdfGenerate.js server/final-form.html server/test/template.test.js server/test/fixtures/sample-fields.json
git commit -m "feat(server): print treated-insoles question and recommended midras type in the PDF"
```

---

### Task 2: Frontend engine — `showIf` visibility on customer-details fields

**Files:**
- Modify: `charts6/src/app/form/form-elements-components/form-interface.ts:69-76`
- Modify: `charts6/src/app/form/form-elements-components/simple-form.component.ts`
- Modify: `charts6/src/app/form/form-elements-components/simple-form.component.html`
- Create (test): `charts6/src/app/form/form-elements-components/simple-form.component.spec.ts`

**Interfaces:**
- Consumes: existing `RadioComponent` / `InputComponent` (each `addControl`s its own control on init; `FormGroup.addControl` is a no-op when the name already exists, so re-reveal reuses the cleared control).
- Produces: `ICustomerDetails.showIf?: IShowIf` with `IShowIf { field: string, equals: string }`; `SimpleFormComponent.isVisible(elem: ICustomerDetails): boolean`. Hidden-field clearing: when a `showIf` elem's condition stops holding, its control (if it exists) is reset to `''` with `{emitEvent: false}`. Task 3 relies on exactly this shape.

- [ ] **Step 1: Write the failing spec**

Create `charts6/src/app/form/form-elements-components/simple-form.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { SimpleFormComponent } from './simple-form.component';
import { ICustomerDetails } from './form-interface';

describe('SimpleFormComponent showIf', () => {
  const DETAILS: ICustomerDetails[] = [
    {
      class: 'full-row',
      radio: {
        name: 'treatedInsoles',
        label: 'האם מטופל במדרסים?',
        elements: [
          { id: 'treated-insoles-yes', label: 'כן' },
          { id: 'treated-insoles-no', label: 'לא' }
        ]
      }
    },
    {
      showIf: { field: 'treatedInsoles', equals: 'כן' },
      input: { id: 'insoles-type', name: 'insolesType', type: 'text', label: 'איזה סוג?' }
    },
    {
      showIf: { field: 'treatedInsoles', equals: 'כן' },
      input: { id: 'insoles-duration', name: 'insolesDuration', type: 'text', label: 'כמה זמן?' }
    }
  ];

  function create(): ComponentFixture<SimpleFormComponent> {
    const fixture = TestBed.createComponent(SimpleFormComponent);
    fixture.componentInstance.customerForm = DETAILS;
    fixture.componentInstance.parentForm = new FormGroup({});
    fixture.detectChanges();
    return fixture;
  }

  function answer(fixture: ComponentFixture<SimpleFormComponent>, value: string) {
    fixture.componentInstance.parentForm.controls['treatedInsoles'].setValue(value);
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SimpleFormComponent] });
  });

  it('hides showIf fields until the controlling answer matches', () => {
    const fixture = create();
    expect(fixture.nativeElement.querySelector('#insoles-type')).toBeNull();
    expect(fixture.nativeElement.querySelector('#insoles-duration')).toBeNull();
    answer(fixture, 'כן');
    expect(fixture.nativeElement.querySelector('#insoles-type')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('#insoles-duration')).not.toBeNull();
    answer(fixture, 'לא');
    expect(fixture.nativeElement.querySelector('#insoles-type')).toBeNull();
  });

  it('clears a hidden field so a stale answer never submits', () => {
    const fixture = create();
    const form = fixture.componentInstance.parentForm;
    answer(fixture, 'כן');
    form.controls['insolesType'].setValue('סיליקון');
    fixture.detectChanges();
    answer(fixture, 'לא');
    expect(form.controls['insolesType'].value).toBe('');
    answer(fixture, 'כן');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#insoles-type');
    expect(input.value).toBe('');
  });

  it('leaves fields without showIf permanently visible', () => {
    const fixture = create();
    expect(fixture.nativeElement.querySelector('.main-label')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run the spec to verify it fails**

Run from `charts6/`: `ng test --include='**/simple-form.component.spec.ts'`
Expected: FAIL — the conditional inputs render unconditionally (`#insoles-type` found while hidden expected), and TS may error on the unknown `showIf` property.

- [ ] **Step 3: Add `IShowIf` to the interface**

In `form-interface.ts`, add above `ICustomerDetails` and extend it:

```ts
export interface IShowIf {
    field: string,
    equals: string
}

export interface ICustomerDetails {
    input?: IInput,
    inputBirthday?: IInputBirthday,
    textarea?: ITextArea,
    radio?: IRadio,
    select?: ISelect,
    class?: string,
    showIf?: IShowIf
}
```

- [ ] **Step 4: Implement visibility + clearing in `SimpleFormComponent`**

Replace `simple-form.component.ts` class body:

```ts
import {Component, DestroyRef, inject, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ICustomerDetails} from "./form-interface";
import {CommonModule} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RadioComponent} from "./radio-component/radio.component";
import {TextAreaComponent} from "./textArea.component";
import {InputComponent} from "./input.component";
import {BirthdayInputComponent} from "./birthday-input.component";
import {SelectComponent} from "./select.component";

@Component({
    selector: 'simple-form',
    imports: [CommonModule, ReactiveFormsModule, RadioComponent, TextAreaComponent, InputComponent, BirthdayInputComponent, SelectComponent],
    templateUrl: 'simple-form.component.html',
    styleUrls: ['./simple-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SimpleFormComponent implements OnInit {
    @Input() customerForm: ICustomerDetails[];
    @Input() parentForm: FormGroup;
    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        const conditional = this.customerForm.filter(elem => elem.showIf);
        if (!conditional.length) return;
        // A hidden field's component is destroyed but its control stays registered in
        // parentForm - clear it so the stale answer is never submitted. emitEvent: false
        // keeps the reset from re-triggering this same subscription.
        this.parentForm.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                for (const elem of conditional) {
                    if (this.isVisible(elem)) continue;
                    const name = elem.input?.name ?? elem.select?.name ?? elem.radio?.name;
                    const control = name ? this.parentForm.controls[name] : undefined;
                    if (control && control.value) control.reset('', {emitEvent: false});
                }
            });
    }

    isVisible(elem: ICustomerDetails): boolean {
        return !elem.showIf || this.parentForm.controls[elem.showIf.field]?.value === elem.showIf.equals;
    }
}
```

Replace `simple-form.component.html` (`*ngFor` and `*ngIf` cannot share an element, hence the `ng-container`; the inner div is otherwise byte-identical to today's):

```html
<ng-container *ngFor="let elem of customerForm">
	<div *ngIf="isVisible(elem)" [ngClass]="elem.class" [formGroup]="parentForm" class="input__container">
		<div class="radios__container" *ngIf="elem.radio">
			<input-radio [parentForm]="parentForm" [radio]="elem.radio"></input-radio>
		</div>
		<textarea-component [parentForm]="parentForm" *ngIf="elem.textarea" [ta]="elem.textarea"></textarea-component>
		<input-component [parentForm]="parentForm" *ngIf="elem.input" [inputElem]="elem.input"></input-component>
		<input-birthday [parentForm]="parentForm" *ngIf="elem.inputBirthday" [inputBirthday]="elem.inputBirthday"></input-birthday>
		<select-component [parentForm]="parentForm" *ngIf="elem.select" [selectElem]="elem.select"></select-component>
	</div>
</ng-container>
```

- [ ] **Step 5: Run the spec to verify it passes**

Run from `charts6/`: `ng test --include='**/simple-form.component.spec.ts'`
Expected: PASS (3 tests).

- [ ] **Step 6: Run the full frontend suite**

Run from `charts6/`: `ng test`
Expected: ALL pass (13 = 10 existing + 3 new); the reshaped template must not break existing specs.

- [ ] **Step 7: Commit**

```bash
git add charts6/src/app/form/form-elements-components/form-interface.ts charts6/src/app/form/form-elements-components/simple-form.component.ts charts6/src/app/form/form-elements-components/simple-form.component.html charts6/src/app/form/form-elements-components/simple-form.component.spec.ts
git commit -m "feat(form-engine): generic showIf visibility with stale-value clearing on customer-details fields"
```

---

### Task 3: Frontend data — new question entries, midras relabel/rename, full-row layout

**Files:**
- Modify: `charts6/src/app/form/form.service.ts:228` (insert after the `referred` entry) and `:253-257` (midras select)
- Modify: `charts6/src/app/form/form-elements-components/simple-form.component.scss`
- Test: `charts6/src/app/form/form.service.spec.ts`

**Interfaces:**
- Consumes: `showIf` / `full-row` from Task 2.
- Produces: submission FormData now carries `treatedInsoles` (`'כן'`/`'לא'`/absent), `insolesType`, `insolesDuration` (free text, absent if never revealed), and `midrasType` (renamed from `midras-type`) — exactly the keys Task 1's server code expects. Absent keys are safe (server defaults them).

- [ ] **Step 1: Add the failing data-shape tests**

Append inside the existing `describe('FormService')` in `form.service.spec.ts`:

```ts
  it('places האם מטופל במדרסים as a full-width row between מקור הגעה and ביטוח', () => {
    const details = service.getFormElements().find(el => el.customerDetails)!.customerDetails!;
    const names = details.map(d => d.radio?.name ?? d.select?.name ?? d.input?.name ?? d.textarea?.id ?? 'birthday');
    const slice = names.slice(names.indexOf('referred'), names.indexOf('insurance') + 1);
    expect(slice).toEqual(['referred', 'treatedInsoles', 'insolesType', 'insolesDuration', 'insurance']);

    const treated = details.find(d => d.radio?.name === 'treatedInsoles')!;
    expect(treated.class).toBe('full-row');
    expect(treated.radio!.label).toBe('האם מטופל במדרסים?');
    expect(treated.radio!.elements.map(e => e.label)).toEqual(['כן', 'לא']);
    expect(treated.showIf).toBeUndefined();
  });

  it('reveals the two follow-up fields only on treatedInsoles = כן', () => {
    const details = service.getFormElements().find(el => el.customerDetails)!.customerDetails!;
    for (const name of ['insolesType', 'insolesDuration']) {
      const field = details.find(d => d.input?.name === name)!;
      expect(field.showIf).toEqual({ field: 'treatedInsoles', equals: 'כן' });
      expect(field.input!.required).toBeUndefined();
    }
    expect(details.find(d => d.input?.name === 'insolesType')!.input!.label).toBe('איזה סוג?');
    expect(details.find(d => d.input?.name === 'insolesDuration')!.input!.label).toBe('כמה זמן?');
  });

  it('offers the midras select as סוג המדרס המומלץ under the midrasType control', () => {
    const details = service.getFormElements().find(el => el.customerDetails)!.customerDetails!;
    const midras = details.find(d => d.select?.name === 'midrasType')?.select;
    expect(midras?.label).toBe('סוג המדרס המומלץ');
    expect(details.find(d => d.select?.name === 'midras-type')).toBeUndefined();
  });
```

- [ ] **Step 2: Run the spec to verify the new tests fail**

Run from `charts6/`: `ng test --include='**/form.service.spec.ts'`
Expected: the 3 new tests FAIL (entries missing / old name and label); the 2 existing tests still pass.

- [ ] **Step 3: Add the form entries and the rename**

In `form.service.ts`, directly after the `referred` select entry (after its closing `},` at line 228) insert:

```ts
            {
                class: 'full-row',
                radio: {
                    name: 'treatedInsoles',
                    label: 'האם מטופל במדרסים?',
                    elements: [
                        {
                            id: 'treated-insoles-yes',
                            label: 'כן'
                        },
                        {
                            id: 'treated-insoles-no',
                            label: 'לא'
                        }
                    ]
                }
            },
            {
                showIf: {field: 'treatedInsoles', equals: 'כן'},
                input: {
                    id: 'insoles-type',
                    name: 'insolesType',
                    type: 'text',
                    label: 'איזה סוג?'
                }
            },
            {
                showIf: {field: 'treatedInsoles', equals: 'כן'},
                input: {
                    id: 'insoles-duration',
                    name: 'insolesDuration',
                    type: 'text',
                    label: 'כמה זמן?'
                }
            },
```

In the midras select entry (previously lines 253-257), change only the label and name (id stays `'midras-type'`):

```ts
                select: {
                    label: 'סוג המדרס המומלץ',
                    id: 'midras-type',
                    name: 'midrasType',
```

- [ ] **Step 4: Add the `full-row` layout class**

In `simple-form.component.scss`, after the existing `.input__container` block:

```scss
// Task 3: the treated-insoles question spans both columns. Because the two-column layout
// is just a 2-per-row flex flow, a half-width insertion here would flip the column of
// every later field - a 100% basis row keeps the flow parity intact.
.input__container.full-row {
  flex-basis: 100%;
}
```

- [ ] **Step 5: Run the spec to verify it passes**

Run from `charts6/`: `ng test --include='**/form.service.spec.ts'`
Expected: PASS (5 tests).

- [ ] **Step 6: Run the full frontend suite**

Run from `charts6/`: `ng test`
Expected: ALL pass (16).

- [ ] **Step 7: Commit**

```bash
git add charts6/src/app/form/form.service.ts charts6/src/app/form/form.service.spec.ts charts6/src/app/form/form-elements-components/simple-form.component.scss
git commit -m "feat(form): add treated-insoles conditional question; relabel midras select to סוג המדרס המומלץ (midrasType)"
```

---

### Task 4: Rebuild dist + local end-to-end visual check

**Files:**
- Modify (generated): `charts6/dist/charts6/**`

**Interfaces:**
- Consumes: everything above. The server serves the **committed** `charts6/dist/charts6/`.
- Produces: a production bundle containing the new question, verified rendering at desktop and 375 px.

- [ ] **Step 1: Production build**

Run from `charts6/`: `npm run build`
Expected: clean build into `charts6/dist/charts6/` (flat).

- [ ] **Step 2: Serve the built app and verify visually via Playwright**

Start the backend from repo root: `npm start` (no Google credentials needed; kill any already-running instance first). Then with Playwright MCP (login guard bypass: intercept `**/get-user-sheets` and fulfill with `{"isAuthentic":true,"userName":"test","mail":"test@test.com"}`, fill the two login inputs, click the button, wait for `**/form`):

1. Neutralize the wizard slide transform (the פרטי לקוח screen sits off-viewport): find the ancestor of `.customer-details__form` whose computed transform ≠ none and set its `transform` so the screen is in view (same technique as the approved mock).
2. Assert/eyeball at desktop width: the question row spans both columns between the מספר טלפון/מקור הגעה row and the ביטוח/סוג המדרס המומלץ row; ביטוח still right column, סוג המדרס המומלץ still left; no field jumped columns.
3. Click כן → both inputs appear (איזה סוג? right, כמה זמן? left) and nothing rides up under neighboring rows (the Task-6 lesson). Click לא → they disappear.
4. Resize to 375 px width and re-check (fields stack in one column; the revealed inputs must not overflow).
5. Screenshot both states to the scratchpad for the PR/user.

Expected: layout intact in both widths and both reveal states. If the radio's own auto-advance (`nextSlide`) misbehaves inside the customer screen, stop and report — `simple-form`'s radio usage has no `(nextSlide)` binding today, so nothing should advance.

- [ ] **Step 3: Verify the submitted FormData keys end-to-end locally**

With the server still running, POST the fixture to `/sendForm` (multipart; no credentials → Drive/mail fail is expected, but the render must succeed):

```bash
node -e "
const fields = require('./server/test/fixtures/sample-fields.json');
const fd = new FormData();
for (const [k, v] of Object.entries(fields)) fd.append(k, v);
fetch('http://localhost:3000/sendForm', { method: 'POST', body: fd })
  .then(r => r.json()).then(console.log).catch(console.error);
"
```

Then `curl -s http://localhost:3000/latestpdf | grep -o 'האם מטופל במדרסים[^<]*<[^>]*>[^<]*'` — expected: the rendered HTML contains the question with `כן` and the detail line (values arrive entity-encoded or literal; if grep on Hebrew is flaky, fetch `/latestpdf` and check for `midrasType`'s value `אקטיבי` and `אקטיב פלקס`).

- [ ] **Step 4: Commit the dist**

```bash
git add charts6/dist
git commit -m "build: rebuild charts6 dist with treated-insoles question"
```

---

### Task 5: Staging deploy, live verification, PR

**Interfaces:**
- Consumes: the complete branch.
- Produces: verified staging deploy + an open PR to `master`. **No production deploy** — that is Gavriel's call, separately.

- [ ] **Step 1: Push the branch and deploy to staging**

```bash
git push -u origin task3-treated-insoles
git push staging task3-treated-insoles:main --force
```

(If the staging Google tokens have expired — OAuth app in Testing mode, 7-day refresh tokens — submission still renders the PDF; only Drive/mail steps fail. That is acceptable for this verification; note it in the report.)

- [ ] **Step 2: Verify on staging**

```bash
node -e "
const fields = require('./server/test/fixtures/sample-fields.json');
const fd = new FormData();
for (const [k, v] of Object.entries(fields)) fd.append(k, v);
fetch('https://midras-staging-263106d691c6.herokuapp.com/sendForm', { method: 'POST', body: fd })
  .then(r => r.json()).then(console.log).catch(console.error);
"
```

Expected: `{status: 'success'}` (or documented Drive/mail-only failure). Then fetch `https://midras-staging-263106d691c6.herokuapp.com/latestpdf` and confirm it contains `האם מטופל במדרסים`, `אקטיב פלקס`, `שנתיים`, and `סוג המדרס המומלץ` with `אקטיבי`. Load the staging form in the browser and repeat the Task 4 visual spot-check (desktop + 375 px).

- [ ] **Step 3: Open the PR**

```bash
gh pr create --title "Task 3: treated-insoles conditional question + recommended midras type" --body "$(cat <<'EOF'
## Summary
- New question **האם מטופל במדרסים?** (כן/לא) as a full-width row in פרטי לקוח between מקור הגעה and the ביטוח/סוג-מדרס row; on **כן** two optional free-text fields are revealed (**איזה סוג?** / **כמה זמן?**), cleared automatically when the answer changes back.
- New generic `showIf` visibility mechanism on customer-details fields (`simple-form`), reusable for future conditional fields.
- Relabeled **סוג מדרס → סוג המדרס המומלץ** and renamed its control `midras-type` → `midrasType`; its value (previously collected but silently dropped) is now printed in the PDF.
- Server: `prepareTemplateFields()` defaults the new keys (old submissions / `regenerateLastPdf` stay safe) and derives the detail line; template prints the three new left-column lines.

Spec: `docs/superpowers/specs/2026-08-06-task3-treated-insoles-design.md`

## Test plan
- [ ] `npm test` (17)
- [ ] `ng test` (16)
- [ ] Staging: fixture POST → `/latestpdf` shows the new lines; form visual check desktop + 375px

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 4: Report**

Summarize to the user: staging URL for his own eyeball test, PR link, test counts, and anything skipped (e.g. expired staging tokens).
