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
});
