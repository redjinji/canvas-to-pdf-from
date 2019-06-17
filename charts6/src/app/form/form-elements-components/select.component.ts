import {Component, Input, OnInit} from "@angular/core";
import {ISelect} from "./form-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'select-component',
    template: `
        <label *ngIf="selectElem.label" [attr.for]="selectElem.id ? selectElem.id : null">{{selectElem.label}}</label>
        <span class="arrow"></span>
        <select [attr.id]="selectElem.id ? selectElem.id : null" name="{{selectElem.name}}" >
        <option *ngFor="let option of selectElem.options" [value]="option.value ? option.value : option.text">{{option.text}}</option>
        </select>
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
    `]
})
export class SelectComponent implements OnInit{
    @Input() selectElem: ISelect;
    radioForm: FormGroup;
    inputRadio: FormControl;
    
    ngOnInit(){
        this.inputRadio = new FormControl('',Validators.required);
        this.radioForm = new FormGroup({
            inputRadio: this.inputRadio
        })
    }
}
