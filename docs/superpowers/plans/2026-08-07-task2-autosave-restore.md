# Task 2 — Autosave / Restore / Retry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Form data (including the 3 foot photos) survives a refresh or network drop mid-fill, the agent is asked before a previous draft is restored, and a failed submission can be manually re-sent from the reject screen.

**Architecture:** A new `FormAutosaveService` persists a single draft (`{values, step}`) to IndexedDB, debounce-saved from `parentForm.valueChanges` + wizard navigation. On `/form` load, an existing draft triggers an in-app prompt (continue / start fresh); "continue" replays the values into the FormGroup (visibility-controlling fields first) and jumps to the saved wizard step. Submission logic moves into a shared `FormSubmitService` (clears the draft on success) so the reject page can offer a manual "שלח שוב" retry from the saved draft. Frontend-only — no server changes.

**Tech Stack:** Angular 22 standalone components, ReactiveFormsModule, RxJS, raw IndexedDB (no runtime deps), vitest + jsdom (`ng test`), `fake-indexeddb` (dev-only) for service tests.

## Global Constraints

- **Never commit or push to `master`.** All work on a new branch `task2-autosave-restore`; PR for Gavriel to review — do not merge it.
- All frontend code lives in `charts6/`; run `ng test` / `ng build` from `charts6/`.
- The server serves the **committed** `charts6/dist/charts6/` — the final task rebuilds and commits dist output.
- No new **runtime** dependencies. Only dev dependency allowed: `fake-indexeddb`.
- Exact Hebrew copy (RTL):
  - Prompt title: `נמצא טופס שלא נשלח`
  - Prompt question: `להמשיך את הטופס הקודם או להתחיל טופס חדש?`
  - Continue button: `המשך טופס קודם`
  - Fresh button: `טופס חדש`
  - Retry button: `שלח שוב`
  - Retry-in-progress: `שולח...`
  - Retry-failed message: `השליחה נכשלה שוב, בדקו את חיבור האינטרנט ונסו שוב`
- Locked decisions (Midras-tasks.md, 2026-08-07): persist everything incl. photos in IndexedDB; ask before restoring; manual retry only (no auto-retry); clear draft on successful submission and on "start fresh"; no age-based expiry.
- Codebase context an implementer must know:
  - Child components self-register controls via `parentForm.addControl(name, ...)` in their `ngOnInit`/`ngAfterViewInit`. Angular's `FormGroup.addControl` is a **no-op if the control name already exists**, so pre-adding a control with a restored value is safe.
  - All wizard screens render at once (`*ngFor` + `translateX` navigation), so every control exists right after first render **except**: the conditional `insolesType` / `insolesDuration` (only when `treatedInsoles === 'כן'`, see `simple-form.component.ts`) — and note `simple-form.component.ts` has a cleanup subscription that **resets any hidden conditional control that has a value** on every `parentForm.valueChanges` emission.
  - Foot photos are base64 data-URLs in controls `image0`–`image2`, set by `foot-image-component.ts#updateFormWithImage`.
  - The codebase relies on explicit `cdr.markForCheck()` for changes that don't originate from a component's own template listener (Angular ≥18 ticks only marked views) — follow that pattern for promise/subscription callbacks.

---

### Task 1: `FormAutosaveService` — IndexedDB draft store

**Files:**
- Create: `charts6/src/app/form/form-autosave.service.ts`
- Test: `charts6/src/app/form/form-autosave.service.spec.ts`
- Modify: `charts6/package.json` (add `fake-indexeddb` devDependency)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces (used by Tasks 2, 3, 6, 7):
  - `interface FormDraft { values: Record<string, any>; step: number; }`
  - `FormAutosaveService.saveDraft(draft: FormDraft): Promise<unknown>`
  - `FormAutosaveService.loadDraft(): Promise<FormDraft | null>`
  - `FormAutosaveService.clearDraft(): Promise<unknown>`
  - All three swallow IndexedDB errors (resolve with `null`) so the form keeps working where IndexedDB is unavailable (e.g. some private-browsing modes).

- [ ] **Step 1: Install fake-indexeddb (dev only)**

```bash
cd charts6 && npm install --save-dev fake-indexeddb
```

- [ ] **Step 2: Write the failing test**

Create `charts6/src/app/form/form-autosave.service.spec.ts`:

```ts
import 'fake-indexeddb/auto';
import { TestBed } from '@angular/core/testing';
import { FormAutosaveService } from './form-autosave.service';

describe('FormAutosaveService', () => {
  let service: FormAutosaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAutosaveService);
  });

  afterEach(() => service.clearDraft());

  it('returns null when no draft was saved', async () => {
    expect(await service.loadDraft()).toBeNull();
  });

  it('round-trips a saved draft', async () => {
    await service.saveDraft({ values: { keshet: 'כן', image0: 'data:image/png;base64,AAA' }, step: 3 });
    const draft = await service.loadDraft();
    expect(draft).toEqual({ values: { keshet: 'כן', image0: 'data:image/png;base64,AAA' }, step: 3 });
  });

  it('overwrites the previous draft on save', async () => {
    await service.saveDraft({ values: { keshet: 'כן' }, step: 0 });
    await service.saveDraft({ values: { keshet: 'לא' }, step: 1 });
    expect((await service.loadDraft()).values.keshet).toBe('לא');
  });

  it('clearDraft removes the draft', async () => {
    await service.saveDraft({ values: { keshet: 'כן' }, step: 0 });
    await service.clearDraft();
    expect(await service.loadDraft()).toBeNull();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run (from `charts6/`): `ng test --include='**/form-autosave.service.spec.ts'`
Expected: FAIL — cannot resolve `./form-autosave.service`.

- [ ] **Step 4: Write the implementation**

Create `charts6/src/app/form/form-autosave.service.ts`:

```ts
import {Injectable} from "@angular/core";

export interface FormDraft {
    values: Record<string, any>;
    step: number;
}

const DB_NAME = 'midras-form';
const STORE = 'drafts';
const KEY = 'current';

@Injectable({providedIn: 'root'})
export class FormAutosaveService {

    private openDb(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, 1);
            req.onupgradeneeded = () => req.result.createObjectStore(STORE);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    // A failed IndexedDB (private mode, quota) must never break the form itself.
    private withStore<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T | null> {
        return this.openDb().then(db => new Promise<T>((resolve, reject) => {
            const tx = db.transaction(STORE, mode);
            const req = run(tx.objectStore(STORE));
            tx.oncomplete = () => { db.close(); resolve(req.result); };
            tx.onerror = () => { db.close(); reject(tx.error); };
            tx.onabort = () => { db.close(); reject(tx.error); };
        })).catch(err => {
            console.log('autosave unavailable:', err);
            return null;
        });
    }

    saveDraft(draft: FormDraft): Promise<unknown> {
        return this.withStore('readwrite', store => store.put(draft, KEY));
    }

    loadDraft(): Promise<FormDraft | null> {
        return this.withStore('readonly', store => store.get(KEY) as IDBRequest<FormDraft>)
            .then(draft => draft ?? null);
    }

    clearDraft(): Promise<unknown> {
        return this.withStore('readwrite', store => store.delete(KEY));
    }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `ng test --include='**/form-autosave.service.spec.ts'`
Expected: 4 tests PASS.

- [ ] **Step 6: Commit**

```bash
git checkout -b task2-autosave-restore
git add charts6/src/app/form/form-autosave.service.ts charts6/src/app/form/form-autosave.service.spec.ts charts6/package.json charts6/package-lock.json
git commit -m "feat(task2): IndexedDB draft store service"
```

---

### Task 2: `applyDraft` — replay saved values into the FormGroup

**Files:**
- Modify: `charts6/src/app/form/form-autosave.service.ts`
- Test: `charts6/src/app/form/form-autosave.service.spec.ts` (extend)

**Interfaces:**
- Consumes: `FormService.getFormElements()` (existing), `FormDraft` from Task 1.
- Produces (used by Task 3): `FormAutosaveService.applyDraft(form: FormGroup, values: Record<string, any>): void`
  - Sets visibility-controlling fields (any field named in a `showIf`) **before** all others — otherwise `simple-form.component.ts`'s cleanup subscription resets the still-hidden conditional answers (`insolesType`, `insolesDuration`) as they are applied.
  - For a saved key with no registered control yet (conditional fields), pre-adds the control with the value; the child component's later `addControl` is a no-op, so the value survives.

- [ ] **Step 1: Write the failing tests**

Append to `charts6/src/app/form/form-autosave.service.spec.ts` (add imports at top: `import { FormControl, FormGroup } from '@angular/forms';`, `import { ComponentFixture } from '@angular/core/testing';`, `import { SimpleFormComponent } from './form-elements-components/simple-form.component';`, `import { ICustomerDetails } from './form-elements-components/form-interface';`):

```ts
describe('FormAutosaveService.applyDraft', () => {
  let service: FormAutosaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SimpleFormComponent] });
    service = TestBed.inject(FormAutosaveService);
  });

  it('sets values on existing controls and pre-adds missing ones', () => {
    const form = new FormGroup({ keshet: new FormControl() });
    service.applyDraft(form, { keshet: 'כן', insolesType: 'סיליקון' });
    expect(form.controls['keshet'].value).toBe('כן');
    expect(form.controls['insolesType'].value).toBe('סיליקון');
  });

  it('restores conditional answers through SimpleForm without them being cleaned up', () => {
    // Mount the real SimpleFormComponent so its hidden-field cleanup subscription is live,
    // then verify controller-first ordering keeps the conditional answers.
    const DETAILS: ICustomerDetails[] = [
      { radio: { name: 'treatedInsoles', label: 'האם מטופל במדרסים?', elements: [
        { id: 'treated-insoles-yes', label: 'כן' }, { id: 'treated-insoles-no', label: 'לא' } ] } },
      { showIf: { field: 'treatedInsoles', equals: 'כן' },
        input: { id: 'insoles-type', name: 'insolesType', type: 'text', label: 'איזה סוג?' } },
      { showIf: { field: 'treatedInsoles', equals: 'כן' },
        input: { id: 'insoles-duration', name: 'insolesDuration', type: 'text', label: 'כמה זמן?' } }
    ];
    const fixture: ComponentFixture<SimpleFormComponent> = TestBed.createComponent(SimpleFormComponent);
    fixture.componentInstance.customerForm = DETAILS;
    fixture.componentInstance.parentForm = new FormGroup({});
    fixture.detectChanges();
    const form = fixture.componentInstance.parentForm;

    service.applyDraft(form, { insolesType: 'סיליקון', insolesDuration: 'שנה', treatedInsoles: 'כן' });
    fixture.detectChanges();

    expect(form.controls['treatedInsoles'].value).toBe('כן');
    expect(form.controls['insolesType'].value).toBe('סיליקון');
    expect(form.controls['insolesDuration'].value).toBe('שנה');
    expect(fixture.nativeElement.querySelector('#insoles-type')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `ng test --include='**/form-autosave.service.spec.ts'`
Expected: FAIL — `applyDraft` is not a function.

- [ ] **Step 3: Implement `applyDraft`**

In `charts6/src/app/form/form-autosave.service.ts`, add imports and inject `FormService`:

```ts
import {FormControl, FormGroup} from "@angular/forms";
import {FormService} from "./form.service";
```

```ts
    constructor(private formService: FormService) {}
```

Add the method to the class:

```ts
    // Fields that other fields' visibility depends on (showIf) must be set first,
    // otherwise SimpleForm's cleanup resets the still-hidden conditional answers.
    applyDraft(form: FormGroup, values: Record<string, any>) {
        const controllers = new Set<string>();
        for (const elem of this.formService.getFormElements()) {
            for (const detail of elem.customerDetails ?? []) {
                if (detail.showIf) controllers.add(detail.showIf.field);
            }
        }
        const keys = Object.keys(values);
        const ordered = [...keys.filter(k => controllers.has(k)), ...keys.filter(k => !controllers.has(k))];
        for (const key of ordered) {
            const control = form.controls[key];
            if (control) control.setValue(values[key]);
            else form.addControl(key, new FormControl(values[key]));
        }
    }
```

(If `IFormElement` doesn't type `customerDetails`/`showIf` loosely enough for this to compile, check `charts6/src/app/form/form-elements-components/form-interface.ts` — `customerDetails?: ICustomerDetails[]` and `showIf?: {field: string; equals: string}` already exist there from Task 3's conditional-question work.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `ng test --include='**/form-autosave.service.spec.ts'`
Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add charts6/src/app/form/form-autosave.service.ts charts6/src/app/form/form-autosave.service.spec.ts
git commit -m "feat(task2): applyDraft replays saved values, controllers first"
```

---

### Task 3: Wire autosave + restore prompt into `MidrasFormComponent`

**Files:**
- Modify: `charts6/src/app/form/midras-form.component.ts`
- Modify: `charts6/src/app/form/midras-form.component.html`
- Modify: `charts6/src/app/form/midras-form.component.scss`

**Interfaces:**
- Consumes: `FormAutosaveService.loadDraft/saveDraft/clearDraft/applyDraft` (Tasks 1–2), `FormNavigationService.goto(position)` and `.currentPosition` (existing), `FormNavigationService.navigate` EventEmitter (existing).
- Produces (used by Task 4 implicitly): restored `image0`–`image2` control values are set **with events emitted** so `FootImageComponent`'s subscriptions (Task 4) can redraw thumbnails.
- Behavior contract:
  - Autosave starts **only after** the draft question is resolved (or immediately when no draft exists) — otherwise the `addControl` storm during initial render and the empty form would overwrite the saved draft before the user answers.
  - A draft whose values are all empty (`null`/`''`) is treated as "no draft" and never prompts.
  - "טופס חדש" clears the draft (locked decision 4).

No component-level vitest spec: `MidrasFormComponent` instantiates `FootImageComponent`, whose canvas `getContext('2d')` is unavailable under jsdom. The service logic is covered by Tasks 1–2 tests; this task is verified by build + manual check (Step 4).

- [ ] **Step 1: Component changes**

In `charts6/src/app/form/midras-form.component.ts`:

Add imports:

```ts
import {DestroyRef, inject} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, merge} from "rxjs";
import {FormAutosaveService, FormDraft} from "./form-autosave.service";
```

(Fold `DestroyRef`/`inject` into the existing `@angular/core` import line.)

Add fields and inject the service (constructor param `private autosave: FormAutosaveService`):

```ts
  restorePromptVisible = false;
  private pendingDraft: FormDraft | null = null;
  private destroyRef = inject(DestroyRef);
```

At the end of `ngOnInit()` (after `window['activeForm'] = this.parentForm;`):

```ts
    this.autosave.loadDraft().then(draft => {
      if (draft && Object.values(draft.values).some(value => value)) {
        this.pendingDraft = draft;
        this.restorePromptVisible = true;
      } else {
        this.startAutosave();
      }
      // Angular >=18 ticks only marked views; promise callback, not a template listener.
      this.cdr.markForCheck();
    });
```

Add the methods:

```ts
  restoreDraft() {
    const draft = this.pendingDraft;
    this.restorePromptVisible = false;
    this.pendingDraft = null;
    this.autosave.applyDraft(this.parentForm, draft.values);
    this.fromNavigationService.goto(draft.step);
    this.startAutosave();
  }

  startFresh() {
    this.restorePromptVisible = false;
    this.pendingDraft = null;
    this.autosave.clearDraft();
    this.startAutosave();
  }

  private startAutosave() {
    merge(this.parentForm.valueChanges, this.fromNavigationService.navigate)
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.autosave.saveDraft({
          values: this.parentForm.value,
          step: this.fromNavigationService.currentPosition
        });
      });
  }
```

- [ ] **Step 2: Template — restore prompt overlay**

In `charts6/src/app/form/midras-form.component.html`, add after the closing `</div>` of `.midras-form__wrapper` (next to the existing `.send-from-overlay`):

```html
<div class="restore-prompt-overlay" *ngIf="restorePromptVisible">
	<div class="restore-prompt">
		<h3 class="restore-prompt__title">נמצא טופס שלא נשלח</h3>
		<p class="restore-prompt__question">להמשיך את הטופס הקודם או להתחיל טופס חדש?</p>
		<div class="restore-prompt__buttons">
			<button type="button" class="btn restore-prompt__continue" (click)="restoreDraft()">המשך טופס קודם</button>
			<button type="button" class="btn restore-prompt__fresh" (click)="startFresh()">טופס חדש</button>
		</div>
	</div>
</div>
```

- [ ] **Step 3: Styles**

Append to `charts6/src/app/form/midras-form.component.scss`:

```scss
.restore-prompt-overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);

  .restore-prompt {
    direction: rtl;
    text-align: center;
    background: #fff;
    border-radius: 8px;
    padding: 24px 32px;
    max-width: 90vw;

    .restore-prompt__buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 16px;

      .btn {
        cursor: pointer;
      }
    }
  }
}
```

(Match the existing `.btn` look — check how `midras-form.component.scss` styles `.form-submit .btn` and reuse; do not invent a new visual language.)

- [ ] **Step 4: Verify — full test suite + build + manual smoke**

Run: `cd charts6 && ng test` — Expected: all specs pass (existing 10 + Tasks 1–2 additions).
Run: `ng build` — Expected: clean build.

Manual smoke (backend `npm start` from repo root + `ng serve`, open `http://localhost:4200`):
1. Log in, answer 2–3 questions, wait ~1s, refresh → re-login → prompt appears.
2. "המשך טופס קודם" → answers and wizard step restored.
3. Refresh again, "טופס חדש" → empty form; refresh once more → no prompt (draft cleared).

- [ ] **Step 5: Commit**

```bash
git add charts6/src/app/form/midras-form.component.ts charts6/src/app/form/midras-form.component.html charts6/src/app/form/midras-form.component.scss
git commit -m "feat(task2): autosave to IndexedDB + restore prompt on /form"
```

---

### Task 4: Restore foot-photo thumbnails in `FootImageComponent`

**Files:**
- Modify: `charts6/src/app/form/form-elements-components/take-image-elements/foot-image-component.ts`

**Interfaces:**
- Consumes: restored `image0`–`image2` data-URL values arriving via `control.valueChanges` (emitted by Task 3's `applyDraft`).
- Behavior contract: when a control receives a data-URL while no photo has been taken in this session (`thumbnailGalleryAmount[i].imageTaken` is falsy), the component loads it and draws the thumbnail + main canvas. Photos the user takes go through `drew()`, which sets `imageTaken = true` **before** `updateFormWithImage` writes the control, so those emissions are skipped — no double-draw, and retakes keep working.

No vitest spec (canvas 2d context unavailable under jsdom — same reason `FootImageComponent` has no existing spec). Verified manually in Step 2.

- [ ] **Step 1: Subscribe to restored image values**

In `foot-image-component.ts` `ngAfterViewInit()`, after the three `addControl('imageN', ...)` lines, add:

```ts
        for (let i = 0; i < 3; i++) {
            this.parentForm.controls[`image${i}`].valueChanges.subscribe(value => {
                // Only a restored draft sets these controls from outside; a photo the
                // user takes goes through drew(), which flags imageTaken before the
                // control value lands here — skip those.
                if (!value || this.thumbnailGalleryAmount[i]?.['imageTaken']) return;
                const img = new Image();
                img.onload = () => {
                    this.thumbnailGalleryAmount[i]['imageTaken'] = true;
                    this.canvasParams.images[i] = img;
                    this.currentCameraInput = i;
                    this.updateCanvasThumbnails(img, i);
                    this.updateCanvasElements();

                    // Angular >=18 ticks only marked views; Image.onload callback.
                    this.cdr.markForCheck();
                };
                img.src = value;
            });
        }
```

Note: `thumbnailGalleryAmount[i]` entries are arrays carrying an `imageTaken` expando property (existing pattern in `drew()` — keep it; index-access with `['imageTaken']` avoids a TS property error on `any[]`).

- [ ] **Step 2: Verify — build + manual smoke**

Run: `cd charts6 && ng build` — Expected: clean.
Manual (dev servers as in Task 3): take at least one foot photo, wait ~1s, refresh, re-login, "המשך טופס קודם" → the photo's thumbnail and main canvas render on the foot-image step; retaking that photo still works.

- [ ] **Step 3: Commit**

```bash
git add charts6/src/app/form/form-elements-components/take-image-elements/foot-image-component.ts
git commit -m "feat(task2): redraw restored foot photos on the canvas thumbnails"
```

---

### Task 5: `SelectComponent` — reflect a restored value in the "other" UI

**Files:**
- Modify: `charts6/src/app/form/form-elements-components/select.component.ts`
- Test: `charts6/src/app/form/form-elements-components/select.component.spec.ts` (extend)

**Interfaces:**
- Consumes: restored parent-control value for a select with an `other: true` option (today only `referred` / מקור הגעה).
- Behavior contract: for selects **with** an `other` option, the native `<select>` is bound to the internal `choiceControl`, so a restored parent-control value doesn't show in the UI (the value would still submit, but the agent would see a blank select). After this task: a parent-control value matching a regular option selects that option; any other non-empty value selects "אחר" and fills the free-text input. Selects without `other` need nothing — they bind the parent control directly.

- [ ] **Step 1: Write the failing tests**

Open `charts6/src/app/form/form-elements-components/select.component.spec.ts`, read its existing setup helpers, and add (reusing the file's existing fixture-creation pattern for a select whose options include `{ text: 'אחר', other: true }` plus a regular option `{ text: 'מזדמן' }`, control name `referred`):

```ts
  it('reflects a restored regular value in the select UI', () => {
    const fixture = createOtherSelect(); // the spec's existing helper for an other:true select
    const component = fixture.componentInstance;
    component.parentForm.controls['referred'].setValue('מזדמן');
    fixture.detectChanges();
    expect(component.selectControl.value).toBe('מזדמן');
    expect(fixture.nativeElement.querySelector('.select-other-input')).toBeNull();
  });

  it('reflects a restored free-text value as אחר + filled text input', () => {
    const fixture = createOtherSelect();
    const component = fixture.componentInstance;
    component.parentForm.controls['referred'].setValue('שכן המליץ');
    fixture.detectChanges();
    expect(component.selectControl.value).toBe('אחר');
    const other: HTMLInputElement = fixture.nativeElement.querySelector('.select-other-input');
    expect(other).not.toBeNull();
    expect(other.value).toBe('שכן המליץ');
  });
```

(If the existing spec's helper has a different name/shape, adapt the two tests to it — the assertions are the contract, the setup is not.)

- [ ] **Step 2: Run tests to verify they fail**

Run: `ng test --include='**/select.component.spec.ts'`
Expected: the two new tests FAIL (selectControl stays `''`); existing tests still pass.

- [ ] **Step 3: Implement the back-sync**

In `select.component.ts`, extract the resolved-value computation so the subscription can tell its own writes apart from external (restore) writes. Replace `syncResolvedValue()` with:

```ts
    private resolvedValue() {
        const choice = this.choiceControl!.value;
        return this.otherSelected
            ? ((this.otherTextControl.value || '').trim() || this.otherLabel)
            : choice;
    }

    private syncResolvedValue() {
        const choice = this.choiceControl!.value;
        const target = this.parentForm.controls[this.selectElem.name];
        target.setValue(this.resolvedValue());
        if (choice) {
            target.markAsDirty(); // setValue alone doesn't; the floating label keys off .dirty
        }
    }
```

In `ngOnInit()`, inside the `if (otherOption) { ... }` block (after the two existing subscriptions), add:

```ts
            // A restored draft writes the resolved value straight to the parent control;
            // mirror it back into the choice/other controls so the UI shows it.
            this.parentForm.controls[this.selectElem.name].valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(value => {
                    if (!value || value === this.resolvedValue()) return; // our own write
                    const isOption = this.selectElem.options.some(option => !option.other &&
                        this.checkDefaultValue(option.hidden, option.disabled, option.defaultSelect, option.value, option.text) === value);
                    this.choiceControl!.setValue(isOption ? value : this.otherLabel, {emitEvent: false});
                    this.otherTextControl.setValue(isOption || value === this.otherLabel ? '' : value, {emitEvent: false});
                });
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `ng test --include='**/select.component.spec.ts'`
Expected: all tests in the file PASS (existing + 2 new).

- [ ] **Step 5: Commit**

```bash
git add charts6/src/app/form/form-elements-components/select.component.ts charts6/src/app/form/form-elements-components/select.component.spec.ts
git commit -m "feat(task2): restored value reflects in select-with-other UI"
```

---

### Task 6: `FormSubmitService` — shared submit, draft cleared on success

**Files:**
- Create: `charts6/src/app/form/form-submit.service.ts`
- Test: `charts6/src/app/form/form-submit.service.spec.ts`
- Modify: `charts6/src/app/form/midras-form.component.ts` (refactor `sendForm`)

**Interfaces:**
- Consumes: `FormAutosaveService.clearDraft()` (Task 1), `environment.serverCall`, `localStorage.userAuth` (existing shape: `{userName, mail}`).
- Produces (used by Task 7):
  - `interface FormResponse { status: string; error?: any; }`
  - `FormSubmitService.submit(values: Record<string, any>): Observable<FormResponse>` — builds the same FormData `sendForm` builds today (`fieldAgentName`, `fieldAgentMail`, Hebrew-locale `submitTime`, then every value with `|| ''`), POSTs to `${environment.serverCall}/sendForm`, and clears the draft when the response status is not `'fail'` (locked decision 4; a failed submit keeps the draft for retry — locked decision 3).

- [ ] **Step 1: Write the failing tests**

Create `charts6/src/app/form/form-submit.service.spec.ts`:

```ts
import 'fake-indexeddb/auto';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormSubmitService } from './form-submit.service';
import { FormAutosaveService } from './form-autosave.service';
import { environment } from '../../environments/environment';

describe('FormSubmitService', () => {
  let service: FormSubmitService;
  let autosave: FormAutosaveService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FormSubmitService);
    autosave = TestBed.inject(FormAutosaveService);
    http = TestBed.inject(HttpTestingController);
    localStorage.setItem('userAuth', JSON.stringify({ userName: 'סוכן', mail: 'agent@test.com' }));
  });

  afterEach(async () => {
    http.verify();
    localStorage.clear();
    await autosave.clearDraft();
  });

  it('POSTs the values plus the agent fields as FormData', () => {
    let response: any;
    service.submit({ keshet: 'כן', phone: null }).subscribe(r => response = r);
    const req = http.expectOne(`${environment.serverCall}/sendForm`);
    expect(req.request.method).toBe('POST');
    const body: FormData = req.request.body;
    expect(body.get('fieldAgentName')).toBe('סוכן');
    expect(body.get('fieldAgentMail')).toBe('agent@test.com');
    expect(body.get('submitTime')).toBeTruthy();
    expect(body.get('keshet')).toBe('כן');
    expect(body.get('phone')).toBe(''); // null values submit as '' (existing behavior)
    req.flush({ status: 'success' });
    expect(response.status).toBe('success');
  });

  it('clears the saved draft on success', async () => {
    await autosave.saveDraft({ values: { keshet: 'כן' }, step: 0 });
    service.submit({ keshet: 'כן' }).subscribe();
    http.expectOne(`${environment.serverCall}/sendForm`).flush({ status: 'success' });
    await new Promise(resolve => setTimeout(resolve, 0)); // let clearDraft's IDB work settle
    expect(await autosave.loadDraft()).toBeNull();
  });

  it('keeps the draft when the server reports fail', async () => {
    await autosave.saveDraft({ values: { keshet: 'כן' }, step: 0 });
    service.submit({ keshet: 'כן' }).subscribe();
    http.expectOne(`${environment.serverCall}/sendForm`).flush({ status: 'fail' });
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(await autosave.loadDraft()).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `ng test --include='**/form-submit.service.spec.ts'`
Expected: FAIL — cannot resolve `./form-submit.service`.

- [ ] **Step 3: Implement the service**

Create `charts6/src/app/form/form-submit.service.ts`:

```ts
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {FormAutosaveService} from "./form-autosave.service";

export interface FormResponse {
    status: string;
    error?: any;
}

@Injectable({providedIn: 'root'})
export class FormSubmitService {
    private url = `${environment.serverCall}/sendForm`;

    constructor(private http: HttpClient, private autosave: FormAutosaveService) {}

    submit(values: Record<string, any>): Observable<FormResponse> {
        const formData = new FormData();
        const fieldAgent = JSON.parse(localStorage.getItem('userAuth'));

        formData.append('fieldAgentName', fieldAgent.userName);
        formData.append('fieldAgentMail', fieldAgent.mail);
        formData.append('submitTime', new Date().toLocaleString('he-il'));
        for (const key in values) {
            formData.append(key, values[key] || '');
        }

        return this.http.post<FormResponse>(this.url, formData).pipe(
            tap(response => {
                if (response.status !== 'fail') this.autosave.clearDraft();
            })
        );
    }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `ng test --include='**/form-submit.service.spec.ts'`
Expected: 3 tests PASS.

- [ ] **Step 5: Refactor `MidrasFormComponent.sendForm` to use it**

In `midras-form.component.ts`: remove the local `FormResponse` interface, the `url` field, the `HttpClient` import/injection, and the `environment` import; inject `private formSubmit: FormSubmitService` (import from `./form-submit.service`). Replace `sendForm()`:

```ts
  sendForm() {
    if (this.parentForm.valid) {
      this.formSubmit.submit(this.parentForm.value).subscribe(
        response => {
          if (response.status === 'fail') {
            console.log(response);
            this.router.navigate(['/reject-form']);
          } else {
            this.router.navigate(['/success-form']);
          }
        },
        error => {
          console.log(error);
          this.router.navigate(['/reject-form']);
        }
      );
      this.activeSpinner = true;
    }
  }
```

- [ ] **Step 6: Full verify**

Run: `ng test` — Expected: all specs pass.
Run: `ng build` — Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add charts6/src/app/form/form-submit.service.ts charts6/src/app/form/form-submit.service.spec.ts charts6/src/app/form/midras-form.component.ts
git commit -m "refactor(task2): shared FormSubmitService, draft cleared on success"
```

---

### Task 7: "שלח שוב" retry on the reject page

**Files:**
- Modify: `charts6/src/app/final-page/reject-page-component.ts`
- Modify: `charts6/src/app/final-page/reject-form-page.html`
- Modify: `charts6/src/app/final-page/reject-form-page.scss`
- Test: `charts6/src/app/final-page/reject-page-component.spec.ts` (create)

**Interfaces:**
- Consumes: `FormAutosaveService.loadDraft()` (Task 1), `FormSubmitService.submit(values)` (Task 6).
- Behavior contract: on load, the reject page looks for a draft; if present it shows "שלח שוב". Retry re-submits the **saved** values (they include the photos). Success → navigate to `/success-form` (the service already cleared the draft). Fail/network error → stay, show the retry-failed message, button re-enabled. No draft → no button (locked decision 3: manual retry only).

- [ ] **Step 1: Write the failing tests**

Create `charts6/src/app/final-page/reject-page-component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RejectPageComponent } from './reject-page-component';
import { FormAutosaveService } from '../form/form-autosave.service';
import { FormSubmitService } from '../form/form-submit.service';

describe('RejectPageComponent retry', () => {
  let loadDraft: ReturnType<typeof vi.fn>;
  let submit: ReturnType<typeof vi.fn>;

  function create(): ComponentFixture<RejectPageComponent> {
    TestBed.configureTestingModule({
      imports: [RejectPageComponent],
      providers: [
        provideRouter([]),
        { provide: FormAutosaveService, useValue: { loadDraft } },
        { provide: FormSubmitService, useValue: { submit } }
      ]
    });
    const fixture = TestBed.createComponent(RejectPageComponent);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() => {
    loadDraft = vi.fn();
    submit = vi.fn();
  });

  it('hides the retry button when there is no draft', async () => {
    loadDraft.mockResolvedValue(null);
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.retry-btn')).toBeNull();
  });

  it('shows the retry button when a draft exists and resubmits its values', async () => {
    loadDraft.mockResolvedValue({ values: { keshet: 'כן' }, step: 2 });
    submit.mockReturnValue(of({ status: 'success' }));
    const fixture = create();
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate');
    await fixture.whenStable();
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.retry-btn');
    expect(button).not.toBeNull();
    expect(button.textContent).toContain('שלח שוב');
    button.click();
    fixture.detectChanges();

    expect(submit).toHaveBeenCalledWith({ keshet: 'כן' });
    expect(navigate).toHaveBeenCalledWith(['/success-form']);
  });

  it('shows the failure message and keeps the button on a failed retry', async () => {
    loadDraft.mockResolvedValue({ values: { keshet: 'כן' }, step: 2 });
    submit.mockReturnValue(throwError(() => new Error('offline')));
    const fixture = create();
    await fixture.whenStable();
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.retry-btn').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.retry-failed')).not.toBeNull();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.retry-btn');
    expect(button.disabled).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `ng test --include='**/reject-page-component.spec.ts'`
Expected: FAIL — no `.retry-btn` rendered / component has no such behavior yet.

- [ ] **Step 3: Implement the component**

Replace `charts6/src/app/final-page/reject-page-component.ts`:

```ts
import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormAutosaveService, FormDraft} from "../form/form-autosave.service";
import {FormSubmitService} from "../form/form-submit.service";

@Component({
    selector: 'reject-form-page',
    imports: [CommonModule],
    templateUrl: './reject-form-page.html',
    styleUrls: ['./reject-form-page.scss']
})

export class RejectPageComponent implements OnInit {
    canRetry = false;
    sending = false;
    retryFailed = false;
    private draft: FormDraft | null = null;

    constructor(private router: Router,
                private autosave: FormAutosaveService,
                private formSubmit: FormSubmitService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.autosave.loadDraft().then(draft => {
            this.draft = draft;
            this.canRetry = !!draft;

            // Angular >=18 ticks only marked views; promise callback, not a template listener.
            this.cdr.markForCheck();
        });
    }

    retry() {
        if (!this.draft || this.sending) return;
        this.sending = true;
        this.retryFailed = false;
        this.formSubmit.submit(this.draft.values).subscribe(
            response => {
                if (response.status === 'fail') {
                    this.retrySettledWithFailure();
                } else {
                    this.router.navigate(['/success-form']);
                }
            },
            () => this.retrySettledWithFailure()
        );
    }

    private retrySettledWithFailure() {
        this.sending = false;
        this.retryFailed = true;
        this.cdr.markForCheck();
    }
}
```

Replace `charts6/src/app/final-page/reject-form-page.html`:

```html
<div class="success-page-container">
	<h1 class="main-title">טופס לא נשלח</h1>
	<ng-container *ngIf="canRetry">
		<p class="retry-note">הנתונים נשמרו במכשיר — אפשר לנסות לשלוח שוב</p>
		<button type="button" class="btn retry-btn" [disabled]="sending" (click)="retry()">
			{{ sending ? 'שולח...' : 'שלח שוב' }}
		</button>
		<p class="retry-failed" *ngIf="retryFailed">השליחה נכשלה שוב, בדקו את חיבור האינטרנט ונסו שוב</p>
	</ng-container>
</div>
```

Append to `charts6/src/app/final-page/reject-form-page.scss` (read the file first and match the success page's centering/typography; minimal additions):

```scss
.retry-note,
.retry-failed {
  direction: rtl;
  text-align: center;
}

.retry-btn {
  display: block;
  margin: 16px auto 0;
  cursor: pointer;

  &[disabled] {
    opacity: 0.6;
    cursor: default;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `ng test --include='**/reject-page-component.spec.ts'`
Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add charts6/src/app/final-page/
git commit -m "feat(task2): manual resend from the reject screen"
```

---

### Task 8: Full verification, dist rebuild, PR

**Files:**
- Modify: `charts6/dist/charts6/` (rebuilt bundle — committed, the server serves this)

- [ ] **Step 1: Full test suites**

Run: `cd charts6 && ng test` — Expected: all frontend specs pass.
Run: `cd .. && npm test` — Expected: all 18 backend tests pass (nothing server-side changed; this catches accidental breakage).

- [ ] **Step 2: End-to-end manual verification (dev servers)**

Backend `npm start` (repo root) + `ng serve` (charts6), open `http://localhost:4200`:
1. Fill the whole form including 3 photos; refresh mid-way → re-login → prompt → "המשך טופס קודם" → everything back (answers, photos, conditional insoles fields, "אחר" free text in מקור הגעה, wizard step).
2. DevTools → Network → Offline; submit → lands on reject page with "שלח שוב"; click it → failure message shows, button still usable.
3. Network back online → "שלח שוב" → success page; return to `/form` → no prompt (draft cleared).
4. Fresh fill → submit online → success; return to `/form` → no prompt.

- [ ] **Step 3: Rebuild and commit dist**

```bash
cd charts6 && npm run build
cd .. && git add charts6/dist
git commit -m "build(task2): rebuild charts6 dist"
```

- [ ] **Step 4: Push and open PR (do not merge)**

```bash
git push -u origin task2-autosave-restore
gh pr create --title "Task 2: autosave/restore form data + manual resend" --body "$(cat <<'EOF'
## Summary
- Autosave the form (all fields + the 3 foot photos) to IndexedDB, debounced on value/navigation changes
- On /form load with a saved draft: prompt המשך טופס קודם / טופס חדש (restore includes conditional insoles fields, select-אחר free text, photo thumbnails, and the wizard step)
- Draft cleared on successful submission and on טופס חדש; kept on failure
- Reject screen offers a manual שלח שוב that re-submits the saved draft

Implements Task 2 per the locked decisions in Midras-tasks.md (2026-08-07).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01NyhhUBUb8NiMNan32c8dgg
EOF
)"
```

- [ ] **Step 5: Update `Midras-tasks.md` status** (optional, can ride the same PR): mark Task 2 as "PR open" in the status table.

---

## Self-review notes (already applied)

- **Autosave must not start before the prompt is answered** — `addControl` during initial render emits `valueChanges`; an ungated subscription would overwrite the draft with an empty form. Handled by `startAutosave()` gating in Task 3.
- **Conditional-field ordering** — `simple-form`'s cleanup resets hidden-with-value controls on every form emission; `applyDraft` sets `showIf` controller fields first (Task 2, with an integration test against the real `SimpleFormComponent`).
- **Photo thumbnails** — restoring the `imageN` control values alone would submit fine but show empty thumbnails; Task 4 redraws from the restored data-URLs, guarded by `imageTaken` so user-taken photos don't double-draw.
- **Select with אחר** — the parent control holds the resolved value but the UI binds an internal control; Task 5 back-syncs so the agent sees the restored choice.
- **Draft kept on failure** — only a non-`'fail'` response clears it (`FormSubmitService`), satisfying locked decisions 3+4 for both the form flow and the reject-page retry.
- Type/name consistency check: `FormDraft {values, step}`, `saveDraft/loadDraft/clearDraft/applyDraft`, `FormSubmitService.submit(values)` — used identically across Tasks 1–7.
