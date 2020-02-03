import {Component, Input, OnInit} from "@angular/core";
import {IInput, IInputBirthday} from "./form-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'input-birthday',
    template: `
<div [formGroup]="parentForm" class="birthday__container">
        <label>{{inputBirthday.title}}</label>
        <div class="birthday--inputs">
        <input
         formControlName="birthdayDay"
         max="31"
         id="birthdayDay" type="number" name="birthdayDay"/>
        <span>/</span>
        <input
         formControlName="birthdayMonth"
         max="12"
         id="birthdayMonth" type="number" name="birthdayMonth"/>
        <span>/</span>
        <input
         formControlName="birthdayYear"
         max="{{currentYear}}"
         min="1900"
         id="birthdayYear" type="number" name="birthdayYear"/>
        </div>
         </div>
    `,
    styles: [`
    .birthday__container {
        display: flex;
        flex-direction: column;
    }
    .birthday--inputs {
        display:flex;
        justify-content: flex-end;
        flex-direction: row-reverse;
    }
    .birthday--inputs input {
        width: 5rem;
        margin: 0 .25rem;
    }
    `]
})
export class BirthdayInputComponent implements OnInit {
    @Input() inputBirthday: IInputBirthday;
    @Input() parentForm: FormGroup;
    currentYear:number = new Date().getFullYear();
    
    ngOnInit() {
        const formControlValidationNeededDay = this.inputBirthday.required ? new FormControl('', Validators.required) : new FormControl();
        const formControlValidationNeededMounth = this.inputBirthday.required ? new FormControl('', Validators.required) : new FormControl();
        const formControlValidationNeededYear = this.inputBirthday.required ? new FormControl('', Validators.required) : new FormControl();
        this.parentForm.addControl('birthdayDay', formControlValidationNeededDay);
        this.parentForm.addControl('birthdayMonth', formControlValidationNeededMounth);
        this.parentForm.addControl('birthdayYear', formControlValidationNeededYear);
    }
    
}
