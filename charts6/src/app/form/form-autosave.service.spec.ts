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
    expect((await service.loadDraft())!.values['keshet']).toBe('לא');
  });

  it('clearDraft removes the draft', async () => {
    await service.saveDraft({ values: { keshet: 'כן' }, step: 0 });
    await service.clearDraft();
    expect(await service.loadDraft()).toBeNull();
  });
});
