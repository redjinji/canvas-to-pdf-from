import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {IInput} from "./form-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'input-component',
    template: `
    <div class="input__text--container" [formGroup]="parentForm">
        <label class="input__text--label">
            <input
                class="input__text--input"
                formControlName="{{inputElem.name}}"
                [attr.max]="inputElem.maxDate ? inputElem.maxDateParsed : null"
                [attr.min]="inputElem.maxDate ? '1900-01-01' : null"
                type="{{inputElem.type}}" name="{{inputElem.name}}"
                [attr.required]="inputElem.required ? '' : null"
                [attr.placeholder]="inputElem.placeholder ? inputElem.placeholder : null"/>
                            <span class="input__text--elem">{{inputElem.label}}</span>

        </label>
        
         </div>
    `,
    styleUrls: ['input.component.scss'],
    encapsulation: ViewEncapsulation.None
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
