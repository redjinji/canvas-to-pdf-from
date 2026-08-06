# Task 6 — Free text for אחר on מקור הגעה: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When a field agent picks אחר in the מקור הגעה dropdown, reveal a free-text input whose value is what gets submitted and printed in the PDF.

**Architecture:** `ISelectOption` gains an `other?: boolean` flag. When a select has an `other`-flagged option, `SelectComponent` binds the visible `<select>` (and a revealed text input) to internal controls and writes a single **resolved value** into the parent-form control (`referred`) — the option text normally, the typed free text while אחר is selected. Everything downstream (FormData → `testMeText.json` → `{{referred}}` in `server/final-form.html`) is already generic, so **no server/template changes**; only a regression test is added server-side.

**Tech Stack:** Angular 22 standalone components, ReactiveFormsModule, vitest (via `ng test`), `node:test` + `angular-template` for the server regression test.

**Spec:** `docs/superpowers/specs/2026-08-06-task6-referred-other-free-text-design.md`

## Global Constraints

- Work on branch `task6-referred-other-free-text` (already created). **Never commit or push to `master`** — deliver via PR; Gavriel merges.
- Scope: **only מקור הגעה** (`referred`). The ביטוח select's אחר option must NOT get the flag.
- Empty free text while אחר is selected → submit the plain string `אחר`. The field stays not-required.
- PDF shows just the free text (no `אחר -` prefix) — already satisfied by the generic `{{referred}}` interpolation at `server/final-form.html:276`.
- The server serves the **committed** `charts6/dist/` — any frontend change must end with `npm run build` in `charts6/` and committing the dist output.
- Frontend tests run from `charts6/`: `ng test --include='**/<name>.spec.ts'` (vitest). Server tests run from the repo root: `npm test`.
- Server-test gotcha: angular-template entity-encodes the template's static Hebrew; assertions against Hebrew template text must go through the existing `renderedText` helper in `server/test/template.test.js`.
- Hebrew strings in this plan are exact copy — do not re-spell them.
- End commit messages with: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: SelectComponent resolved-value mode

**Files:**
- Modify: `charts6/src/app/form/form-elements-components/form-interface.ts` (add `other?: boolean` to `ISelectOption`)
- Modify: `charts6/src/app/form/form-elements-components/select.component.ts`
- Modify: `charts6/src/app/form/form-elements-components/select.component.scss`
- Test (create): `charts6/src/app/form/form-elements-components/select.component.spec.ts`

**Interfaces:**
- Consumes: existing `ISelect` / `ISelectOption` from `form-interface.ts`; `parentForm: FormGroup` input.
- Produces: `ISelectOption.other?: boolean` — Task 2 sets this flag on the referred אחר option. The parent-form control named `selectElem.name` always holds the submitted value (string).

- [ ] **Step 1: Write the failing component spec**

Create `charts6/src/app/form/form-elements-components/select.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from './select.component';
import { ISelect } from './form-interface';

// Task 6: an option flagged other: true turns the select into "resolved-value" mode — choosing it
// reveals a free-text input, and the parent-form control receives the typed text (or the plain
// option label when the text is empty). Selects without the flag must behave exactly as before.
describe('SelectComponent', () => {
  const REFERRED: ISelect = {
    label: 'מקור הגעה',
    name: 'referred',
    id: 'referred',
    options: [{ text: 'מזדמן' }, { text: 'פרסום' }, { text: 'אחר', other: true }]
  };
  // An אחר option WITHOUT the flag (like the insurance select) keeps plain behavior.
  const PLAIN: ISelect = {
    name: 'insurance',
    options: [{ text: 'כללית' }, { text: 'אחר' }]
  };

  function createSelect(selectElem: ISelect): ComponentFixture<SelectComponent> {
    const fixture = TestBed.createComponent(SelectComponent);
    fixture.componentInstance.selectElem = selectElem;
    fixture.componentInstance.parentForm = new FormGroup({});
    fixture.detectChanges();
    return fixture;
  }

  function choose(fixture: ComponentFixture<SelectComponent>, value: string) {
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    select.value = value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  }

  function otherInput(fixture: ComponentFixture<SelectComponent>): HTMLInputElement | null {
    return fixture.nativeElement.querySelector('.select-other-input');
  }

  function typeOther(fixture: ComponentFixture<SelectComponent>, text: string) {
    const input = otherInput(fixture)!;
    input.value = text;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function submittedValue(fixture: ComponentFixture<SelectComponent>) {
    return fixture.componentInstance.parentForm
      .controls[fixture.componentInstance.selectElem.name].value;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SelectComponent] });
  });

  it('keeps plain behavior for selects without an other-flagged option', () => {
    const fixture = createSelect(PLAIN);
    choose(fixture, 'אחר');
    expect(submittedValue(fixture)).toBe('אחר');
    expect(otherInput(fixture)).toBeNull();
  });

  it('reveals the free-text input only while the other-flagged option is selected', () => {
    const fixture = createSelect(REFERRED);
    expect(otherInput(fixture)).toBeNull();
    choose(fixture, 'אחר');
    expect(otherInput(fixture)).not.toBeNull();
    expect(submittedValue(fixture)).toBe('אחר');
    choose(fixture, 'מזדמן');
    expect(otherInput(fixture)).toBeNull();
    expect(submittedValue(fixture)).toBe('מזדמן');
  });

  it('submits the typed free text instead of אחר', () => {
    const fixture = createSelect(REFERRED);
    choose(fixture, 'אחר');
    typeOther(fixture, ' המלצה מרופא ');
    expect(submittedValue(fixture)).toBe('המלצה מרופא');
  });

  it('falls back to אחר when the free text is left empty', () => {
    const fixture = createSelect(REFERRED);
    choose(fixture, 'אחר');
    typeOther(fixture, '   ');
    expect(submittedValue(fixture)).toBe('אחר');
  });

  it('keeps typed text when switching away and back', () => {
    const fixture = createSelect(REFERRED);
    choose(fixture, 'אחר');
    typeOther(fixture, 'המלצה מרופא');
    choose(fixture, 'פרסום');
    expect(submittedValue(fixture)).toBe('פרסום');
    choose(fixture, 'אחר');
    expect(submittedValue(fixture)).toBe('המלצה מרופא');
  });

  it('floats the label (dirty styling) once a choice is made on an other-enabled select', () => {
    const fixture = createSelect(REFERRED);
    choose(fixture, 'פרסום');
    const label: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(label.className).toContain('selected--true');
  });
});
```

- [ ] **Step 2: Run the spec to verify it fails**

Run (from `charts6/`): `ng test --include='**/select.component.spec.ts'`
Expected: FAIL — TypeScript error on `other: true` (not in `ISelectOption`), and/or the resolved-value tests failing.

- [ ] **Step 3: Add the interface flag**

In `charts6/src/app/form/form-elements-components/form-interface.ts`, extend `ISelectOption` (mirrors `IRadioElement.other`):

```ts
export interface ISelectOption {
    text: string,
    value?: string,
    class?: string,
    defaultSelect?: boolean,
    disabled?: boolean,
    hidden?: boolean,
    other?: boolean
}
```

- [ ] **Step 4: Implement resolved-value mode in SelectComponent**

Replace `charts6/src/app/form/form-elements-components/select.component.ts` with:

```ts
import {Component, DestroyRef, inject, Input, OnInit} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ISelect} from "./form-interface";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'select-component',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
<div class="select-component" [formGroup]="parentForm">
        <label class="selected--label selected--{{parentForm.controls[selectElem.name].dirty}}" *ngIf="selectElem.label" [attr.for]="selectElem.id ? selectElem.id : null">{{selectElem.label}}</label>
        <div class="select-container">
            <span class="arrow"></span>
            <select
                [attr.id]="selectElem.id ? selectElem.id : null"
                name="{{selectElem.name}}"
                [attr.required]="selectElem.required ? '' : null"
                [formControl]="selectControl"
                >
                <option *ngFor="let option of selectElem.options"
                 [attr.selected]="option.defaultSelect? '': null"
                 [attr.disabled]="option.disabled? '': null"
                 [attr.hidden]="option.hidden? '': null"
                 [value]="checkDefaultValue(option.hidden, option.disabled, option.defaultSelect, option.value, option.text)">{{option.text}}</option>
            </select>
        </div>
        <input *ngIf="otherSelected"
               type="text"
               class="select-other-input"
               [formControl]="otherTextControl"
               placeholder="פרט/י"
               (keydown.enter)="$event.preventDefault()">
        </div>
    `,
    styleUrls:['select.component.scss']
})
export class SelectComponent implements OnInit{
    @Input() selectElem: ISelect;
    @Input() parentForm: FormGroup;

    // Present only when an option carries other: true. The <select> then binds to this internal
    // control and the parent-form control holds the resolved value instead.
    choiceControl?: FormControl;
    otherTextControl = new FormControl('');
    private otherLabel?: string;
    private destroyRef = inject(DestroyRef);

    get selectControl(): FormControl {
        return this.choiceControl ?? (this.parentForm.controls[this.selectElem.name] as FormControl);
    }

    get otherSelected(): boolean {
        return !!this.choiceControl && this.choiceControl.value === this.otherLabel;
    }

    ngOnInit(){
        const formControlValidationNeeded = this.selectElem.required ? new FormControl('',Validators.required) : new FormControl();
        this.parentForm.addControl(this.selectElem.name,formControlValidationNeeded);

        const otherOption = this.selectElem.options.find(option => option.other);
        if (otherOption) {
            this.otherLabel = this.checkDefaultValue(otherOption.hidden, otherOption.disabled, otherOption.defaultSelect, otherOption.value, otherOption.text);
            this.choiceControl = new FormControl('');
            this.choiceControl.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.syncResolvedValue());
            this.otherTextControl.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.syncResolvedValue());
        }
    }

    checkDefaultValue(hidden, disable, defaultSelect, value, text){
        if(hidden && disable && defaultSelect) {
            return '';
        } else if (value) {
            return value
        } else {
            return text;
        }
    }

    // The parent-form control always holds what gets submitted (and printed in the PDF): the chosen
    // option, or the typed text while the "other" option is selected (empty text -> the plain label).
    private syncResolvedValue() {
        const choice = this.choiceControl!.value; // only ever called when choiceControl exists
        const resolved = this.otherSelected
            ? ((this.otherTextControl.value || '').trim() || this.otherLabel)
            : choice;
        const target = this.parentForm.controls[this.selectElem.name];
        target.setValue(resolved);
        if (choice) {
            target.markAsDirty(); // setValue alone doesn't; the floating label keys off .dirty
        }
    }
}
```

Notes for the implementer:
- Binding switched from `formControlName` to `[formControl]="selectControl"` so the same markup serves both modes; for non-other selects `selectControl` returns the exact same parent-control instance as before — behaviorally identical.
- `(keydown.enter)="$event.preventDefault()"` mirrors the radio-other input's Enter suppression (`onkeydown="return (event.keyCode!=13);"`) so Enter can't submit the surrounding form.

- [ ] **Step 5: Style the revealed input like the select above it**

Append to `charts6/src/app/form/form-elements-components/select.component.scss`:

```scss
.select-other-input {
  background-color: #fff;
  border: 0;
  border-radius: 0;
  height: 2.8rem;
  width: 100%;
  padding-right: .5rem;
  border-bottom: .1rem solid $color-blue;
  margin-bottom: .4rem;
}
```

- [ ] **Step 6: Run the spec to verify it passes**

Run (from `charts6/`): `ng test --include='**/select.component.spec.ts'`
Expected: PASS (6 tests).

- [ ] **Step 7: Commit**

```bash
git add charts6/src/app/form/form-elements-components/form-interface.ts \
        charts6/src/app/form/form-elements-components/select.component.ts \
        charts6/src/app/form/form-elements-components/select.component.scss \
        charts6/src/app/form/form-elements-components/select.component.spec.ts
git commit -m "Task 6: select component — free-text input for an other-flagged option

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Enable the flag on מקור הגעה in the form definition

**Files:**
- Modify: `charts6/src/app/form/form.service.ts` (the `referred` select, ~line 208-227)
- Test (modify): `charts6/src/app/form/form.service.spec.ts`

**Interfaces:**
- Consumes: `ISelectOption.other?: boolean` from Task 1; `FormService.getFormElements()` returning `IFormElement[]` whose steps carry `customerDetails?: ICustomerDetails[]` each optionally holding a `select`.
- Produces: the live form's `referred` select has `other: true` on its אחר option — this is what activates Task 1's behavior in the app.

- [ ] **Step 1: Write the failing service test**

Append inside the existing `describe('FormService', ...)` block in `charts6/src/app/form/form.service.spec.ts`:

```ts
  // Task 6: only מקור הגעה gets the free-text אחר; the insurance select's אחר stays a plain option.
  it('marks only the referred אחר option as free-text (other)', () => {
    const details = service.getFormElements().flatMap(el => el.customerDetails ?? []);

    const referred = details.find(d => d.select?.name === 'referred')?.select;
    expect(referred?.options.find(o => o.text === 'אחר')?.other).toBe(true);

    const insurance = details.find(d => d.select?.name === 'insurance')?.select;
    expect(insurance?.options.find(o => o.text === 'אחר')?.other).toBeUndefined();
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run (from `charts6/`): `ng test --include='**/form.service.spec.ts'`
Expected: FAIL — `expected undefined to be true` on the referred assertion.

- [ ] **Step 3: Set the flag in the form definition**

In `charts6/src/app/form/form.service.ts`, in the `referred` select's options, change:

```ts
                        {
                            text: 'אחר',
                        }
```

to:

```ts
                        {
                            text: 'אחר',
                            other: true
                        }
```

(Only in the `referred` select — NOT in `insurance`.)

- [ ] **Step 4: Run it to verify it passes**

Run (from `charts6/`): `ng test --include='**/form.service.spec.ts'`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add charts6/src/app/form/form.service.ts charts6/src/app/form/form.service.spec.ts
git commit -m "Task 6: enable free-text אחר on the מקור הגעה select

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Server-side regression lock — free text reaches the PDF

**Files:**
- Test (modify): `server/test/template.test.js`

**Interfaces:**
- Consumes: the existing `renderedText(fields)` helper and `fixtureFields` already defined at the top of `server/test/template.test.js`.
- Produces: nothing new — a regression lock only. The template is already generic; this test is expected to pass immediately (it guards against a future template edit special-casing the field), so there is no fail-first step.

- [ ] **Step 1: Add the regression test**

Append to `server/test/template.test.js`:

```js
// Task 6 - free-text מקור הגעה: when the agent picks אחר and types a custom source, the frontend
// submits the typed text itself as the referred field, and the PDF must print it verbatim under
// "מקור הגעה". The template interpolates {{referred}} generically; this locks that contract.
test('a free-text מקור הגעה value is printed verbatim in the PDF', () => {
    const fields = Object.assign({}, fixtureFields, { referred: 'המלצה מרופא' });
    const text = renderedText(fields);
    assert.ok(
        text.includes('מקור הגעה: המלצה מרופא'),
        'expected the PDF text to print the typed free-text source verbatim under "מקור הגעה"'
    );
});
```

- [ ] **Step 2: Run the server suite**

Run (from the repo root): `npm test`
Expected: PASS — 13 tests (12 existing + this one; the two pdftotext-dependent tests may skip if poppler-utils is absent — that's fine).

- [ ] **Step 3: Commit**

```bash
git add server/test/template.test.js
git commit -m "Task 6: regression test — free-text מקור הגעה prints verbatim in the PDF

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Rebuild dist, full verification, PR

**Files:**
- Modify (generated): `charts6/dist/charts6/**`

**Interfaces:**
- Consumes: all previous tasks committed.
- Produces: the deployable branch — the server serves the committed dist, so this task is what makes the feature actually live.

- [ ] **Step 1: Run the full frontend suite**

Run (from `charts6/`): `ng test`
Expected: PASS — all specs (form.service + select.component + any pre-existing).

- [ ] **Step 2: Production build**

Run (from `charts6/`): `npm run build`
Expected: clean build into `charts6/dist/charts6/` (flat).

- [ ] **Step 3: Run the full server suite**

Run (from the repo root): `npm test`
Expected: PASS — 13 tests (pdftotext-dependent ones may skip).

- [ ] **Step 4: Commit the rebuilt dist**

```bash
git add charts6/dist
git commit -m "Task 6: rebuild charts6 dist with the free-text מקור הגעה feature

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Push the branch and open the PR**

```bash
git push -u origin task6-referred-other-free-text
gh pr create --base master --title "Task 6: free-text אחר on מקור הגעה" --body "..."
```

PR body must cover: the select+reveal design (link the spec file), the scope decision (referred only, insurance untouched), empty-text fallback to אחר, no server/template changes (regression test only), dist rebuilt. End the body with:
`🤖 Generated with [Claude Code](https://claude.com/claude-code)`

Do NOT merge — Gavriel reviews and merges. Staging verification (Gavriel runs it):
`git push staging task6-referred-other-free-text:main --force`, then submit the fixture or a real form and check `GET /latestpdf`.
