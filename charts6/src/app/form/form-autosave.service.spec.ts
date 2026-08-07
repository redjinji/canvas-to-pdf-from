import 'fake-indexeddb/auto';
import { TestBed } from '@angular/core/testing';
import { FormAutosaveService } from './form-autosave.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture } from '@angular/core/testing';
import { SimpleFormComponent } from './form-elements-components/simple-form.component';
import { ICustomerDetails } from './form-elements-components/form-interface';

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
    expect((await service.loadDraft())!.values['keshet']).toBe('לא');
  });

  it('clearDraft removes the draft', async () => {
    await service.saveDraft({ values: { keshet: 'כן' }, step: 0 });
    await service.clearDraft();
    expect(await service.loadDraft()).toBeNull();
  });
});

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

  it('marks restored controls dirty+touched so floating labels float, empty ones stay pristine', () => {
    const form = new FormGroup({ name: new FormControl(''), phone: new FormControl('') });
    service.applyDraft(form, { name: 'לקוח בדיקה', phone: '' });
    expect(form.controls['name'].dirty).toBe(true);
    expect(form.controls['name'].touched).toBe(true);
    expect(form.controls['phone'].dirty).toBe(false);
    expect(form.controls['phone'].touched).toBe(false);
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
