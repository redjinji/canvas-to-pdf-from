import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('titles the footPrint step "דגימת רגל"', () => {
    const footPrintStep = service.getFormElements().find(el => el.radio?.name === 'footPrint');
    expect(footPrintStep?.title).toBe('דגימת רגל');
  });

  it('marks only the referred אחר option as free-text (other)', () => {
    const details = service.getFormElements().flatMap(el => el.customerDetails ?? []);

    const referred = details.find(d => d.select?.name === 'referred')?.select;
    expect(referred?.options.find(o => o.text === 'אחר')?.other).toBe(true);

    const insurance = details.find(d => d.select?.name === 'insurance')?.select;
    expect(insurance?.options.find(o => o.text === 'אחר')?.other).toBeUndefined();
  });

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
});
