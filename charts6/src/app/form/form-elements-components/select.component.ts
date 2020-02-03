import {Component, Input, OnInit} from "@angular/core";
import {ISelect} from "./form-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'select-component',
    template: `
<div class="select-component" [formGroup]="parentForm">
        <label class="selected--label selected--{{parentForm.controls[selectElem.name].dirty}}" *ngIf="selectElem.label" [attr.for]="selectElem.id ? selectElem.id : null">{{selectElem.label}}</label>
        <div class="select-container">
            <span class="arrow"></span>
            <select
                [attr.id]="selectElem.id ? selectElem.id : null"
                name="{{selectElem.name}}"
                [attr.required]="selectElem.required ? '' : null"
                formControlName="{{selectElem.name}}"
                >
                <option *ngFor="let option of selectElem.options"
                 [attr.selected]="option.defaultSelect? '': null"
                 [attr.disabled]="option.disabled? '': null"
                 [attr.hidden]="option.hidden? '': null"
                 [value]="checkDefaultValue(option.hidden, option.disabled, option.defaultSelect, option.value, option.text)">{{option.text}}</option>
            </select>
        </div>
        </div>
    `,
    styleUrls:['select.component.scss']
})
export class SelectComponent implements OnInit{
    @Input() selectElem: ISelect;
    @Input() parentForm: FormGroup;
    
    ngOnInit(){
        const formControlValidationNeeded = this.selectElem.required ? new FormControl('',Validators.required) : new FormControl();
        this.parentForm.addControl(this.selectElem.name,formControlValidationNeeded);
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
}
