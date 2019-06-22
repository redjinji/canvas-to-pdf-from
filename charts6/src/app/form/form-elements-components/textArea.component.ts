import {Component, Input, OnInit} from "@angular/core";
import {ITextArea} from "./form-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'textarea-component',
    template: `<div [formGroup]="parentForm">
        <textarea
        formControlName="{{ta.id}}"
        id="{{ta.id}}"
        placeholder="{{ta.placeHolder}}"
        maxLength="{{ta.length}}"
        rows="{{ta.rows}}"
        [attr.required]="ta.required ? true : null"></textarea>
        </div>`
})

export class TextAreaComponent implements OnInit {
    @Input() ta:ITextArea;
    @Input() parentForm:FormGroup;
    
    ngOnInit(){
        const formControlValidationNeeded = this.ta.required ? new FormControl('',Validators.required) : new FormControl();
        this.parentForm.addControl(this.ta.id, formControlValidationNeeded);
    }
}
