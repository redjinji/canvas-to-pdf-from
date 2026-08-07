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

    // This vitest/jsdom environment exposes no window.localStorage — polyfill it.
    if (!window.localStorage) {
      const store: Record<string, string> = {};
      (window as any).localStorage = {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { Object.keys(store).forEach(key => delete store[key]); },
        length: 0,
        key: (index: number) => null
      } as Storage;
    }

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
