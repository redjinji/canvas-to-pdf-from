import {Component, Input, OnInit} from "@angular/core";
import {ISelect} from "./form-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'select-component',
    template: `
<div [formGroup]="parentForm">
        <label *ngIf="selectElem.label" [attr.for]="selectElem.id ? selectElem.id : null">{{selectElem.label}}</label>
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
    styles:[`
        select {
            background-color: #fff;
            border: 0;
            border-radius: 0;
            height: 2.8rem;
            width: 17.3rem;
            -webkit-appearance: none;
            appearance: none;
            padding-right: .5rem;
        }
        .select-container {
            position: relative;
            width: fit-content;
        }
    `]
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
