import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  // Task 4 (Sahar): the foot-print step must be titled "דגימת רגל", not "טביעת רגל".
  it('titles the footPrint step "דגימת רגל"', () => {
    const footPrintStep = service.getFormElements().find(el => el.radio?.name === 'footPrint');
    expect(footPrintStep?.title).toBe('דגימת רגל');
  });

  // Task 6: only מקור הגעה gets the free-text אחר; the insurance select's אחר stays a plain option.
  it('marks only the referred אחר option as free-text (other)', () => {
    const details = service.getFormElements().flatMap(el => el.customerDetails ?? []);

    const referred = details.find(d => d.select?.name === 'referred')?.select;
    expect(referred?.options.find(o => o.text === 'אחר')?.other).toBe(true);

    const insurance = details.find(d => d.select?.name === 'insurance')?.select;
    expect(insurance?.options.find(o => o.text === 'אחר')?.other).toBeUndefined();
  });
});
