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
