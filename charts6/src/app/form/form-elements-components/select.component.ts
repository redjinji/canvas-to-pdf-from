import {Component, DestroyRef, inject, Input, OnInit} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ISelect} from "./form-interface";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'select-component',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
<div class="select-component" [class.select-component--expanded]="otherSelected" [formGroup]="parentForm">
        <label class="selected--label selected--{{parentForm.controls[selectElem.name].dirty}}" *ngIf="selectElem.label" [attr.for]="selectElem.id ? selectElem.id : null">{{selectElem.label}}</label>
        <div class="select-container">
            <span class="arrow"></span>
            <select
                [attr.id]="selectElem.id ? selectElem.id : null"
                name="{{selectElem.name}}"
                [attr.required]="selectElem.required ? '' : null"
                [formControl]="selectControl"
                >
                <option *ngFor="let option of selectElem.options"
                 [attr.selected]="option.defaultSelect? '': null"
                 [attr.disabled]="option.disabled? '': null"
                 [attr.hidden]="option.hidden? '': null"
                 [value]="checkDefaultValue(option.hidden, option.disabled, option.defaultSelect, option.value, option.text)">{{option.text}}</option>
            </select>
        </div>
        <input *ngIf="otherSelected"
               type="text"
               class="select-other-input"
               [formControl]="otherTextControl"
               placeholder="פרט/י"
               (keydown.enter)="$event.preventDefault()">
        </div>
    `,
    styleUrls:['select.component.scss']
})
export class SelectComponent implements OnInit{
    @Input() selectElem: ISelect;
    @Input() parentForm: FormGroup;

    // Present only when an option carries other: true. The <select> then binds to this internal
    // control and the parent-form control holds the resolved value instead.
    choiceControl?: FormControl;
    otherTextControl = new FormControl('');
    private otherLabel?: string;
    private destroyRef = inject(DestroyRef);

    get selectControl(): FormControl {
        return this.choiceControl ?? (this.parentForm.controls[this.selectElem.name] as FormControl);
    }

    get otherSelected(): boolean {
        return !!this.choiceControl && this.choiceControl.value === this.otherLabel;
    }

    ngOnInit(){
        const formControlValidationNeeded = this.selectElem.required ? new FormControl('',Validators.required) : new FormControl();
        this.parentForm.addControl(this.selectElem.name,formControlValidationNeeded);

        const otherOption = this.selectElem.options.find(option => option.other);
        if (otherOption) {
            this.otherLabel = this.checkDefaultValue(otherOption.hidden, otherOption.disabled, otherOption.defaultSelect, otherOption.value, otherOption.text);
            this.choiceControl = new FormControl('');
            this.choiceControl.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.syncResolvedValue());
            this.otherTextControl.valueChanges
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.syncResolvedValue());
        }
    }

    checkDefaultValue(hidden, disable, defaultSelect, value, text){
        if(hidden && disable && defaultSelect) {
            return '';
        } else if (value) {
            return value
        } else {
            return text;
        }
    }

    // The parent-form control always holds what gets submitted (and printed in the PDF): the chosen
    // option, or the typed text while the "other" option is selected (empty text -> the plain label).
    private syncResolvedValue() {
        const choice = this.choiceControl!.value; // only ever called when choiceControl exists
        const resolved = this.otherSelected
            ? ((this.otherTextControl.value || '').trim() || this.otherLabel)
            : choice;
        const target = this.parentForm.controls[this.selectElem.name];
        target.setValue(resolved);
        if (choice) {
            target.markAsDirty(); // setValue alone doesn't; the floating label keys off .dirty
        }
    }
}
