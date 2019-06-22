import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IRadio} from "./form-interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'input-radio',
    template: `
<div class="radios-container" [formGroup]="parentForm" >
        <ng-template let-isRequired="radios.required" ngFor let-radioElem [ngForOf]="radio.elements">
            <label for="{{radioElem.id}}" [ngClass]="{'checked': parentForm.controls[radio.name].value == radioElem.label}">
                <input (change)="handleChange($event)"
                formControlName="{{radio.name}}"
                [attr.required]="radio.required ? '' : null"
                type="radio"
                id="{{radioElem.id}}"
                value="{{radioElem.label}}">
                <span class="radio-text">
            {{radioElem.label}}
            </span>
            </label>
        </ng-template>
        </div>
    `,
    styleUrls:['./radio.scss']
})
export class RadioComponent implements OnInit {
    @Input() radio: IRadio;
    @Input() parentForm:FormGroup;
    @Output() nextSlide = new EventEmitter();
    
    constructor(){
    
    }
    
    ngOnInit(){
        const formControlValidationNeeded = this.radio.required ? new FormControl('',Validators.required) : new FormControl();
        this.parentForm.addControl(this.radio.name, formControlValidationNeeded);
    }
    
    handleChange(event){
        setTimeout(function(){this.nextSlide.emit()}.bind(this),500);
    }
}
