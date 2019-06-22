import {Component, Input, OnInit} from "@angular/core";
import {IInput} from "./form-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'input-component',
    template: `
<div [formGroup]="parentForm">
        <label for="{{inputElem.id}}"> {{inputElem.label}}
        </label>
        <input
         formControlName="{{inputElem.name}}"
         [attr.max]="inputElem.maxDate ? inputElem.maxDateParsed : null"
         [attr.min]="inputElem.maxDate ? '1900-01-01' : null"
         id="{{inputElem.id}}" type="{{inputElem.type}}" name="{{inputElem.name}}"
         [attr.required]="inputElem.required ? '' : null"
         [attr.placeholder]="inputElem.placeholder ? inputElem.placeholder : null"/>
         </div>
    `
})
export class InputComponent implements OnInit{
    @Input() inputElem: IInput;
    @Input() parentForm:FormGroup;
    
    ngOnInit(){
        if(this.inputElem.maxDate) {
            let day:any;
            let mounth:any;
            
            day = this.inputElem.maxDate.getDate();
            mounth = this.inputElem.maxDate.getMonth()+1;
            const year = this.inputElem.maxDate.getFullYear();
            
            day = day < 10 ? '0'+day : day;
            mounth = mounth < 10 ? '0'+mounth : mounth;
            const date = `${year}-${mounth}-${day}`;
            this.inputElem.maxDateParsed = date;
        }
        const formControlValidationNeeded = this.inputElem.required ? new FormControl('',Validators.required) : new FormControl();
        this.parentForm.addControl(this.inputElem.name, formControlValidationNeeded);
    }
    
}
