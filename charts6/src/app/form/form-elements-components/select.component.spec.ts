import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from './select.component';
import { ISelect } from './form-interface';

describe('SelectComponent', () => {
  const REFERRED: ISelect = {
    label: 'מקור הגעה',
    name: 'referred',
    id: 'referred',
    options: [{ text: 'מזדמן' }, { text: 'פרסום' }, { text: 'אחר', other: true }]
  };
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

  it('adds top clearance while the free-text input is revealed', () => {
    const fixture = createSelect(REFERRED);
    const wrapper = () => fixture.nativeElement.querySelector('.select-component') as HTMLElement;
    expect(wrapper().className).not.toContain('select-component--expanded');
    choose(fixture, 'אחר');
    expect(wrapper().className).toContain('select-component--expanded');
    choose(fixture, 'מזדמן');
    expect(wrapper().className).not.toContain('select-component--expanded');
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
