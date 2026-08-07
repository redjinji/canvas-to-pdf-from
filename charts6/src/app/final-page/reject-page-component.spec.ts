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
