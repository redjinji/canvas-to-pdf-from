import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IRadio} from "../form-interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'input-radio',
    templateUrl: 'radio-component.html',
    styleUrls: ['./radio.scss']
})
export class RadioComponent implements OnInit {
    @Input() radio: IRadio;
    @Input() parentForm: FormGroup;
    @Output() nextSlide = new EventEmitter();
    
    constructor() {
    
    }
    
    ngOnInit() {
        const formControlValidationNeeded = this.radio.required ? new FormControl('', Validators.required) : new FormControl();
        this.parentForm.addControl(this.radio.name, formControlValidationNeeded);
    }
    
    handleChange(event) {
        setTimeout(() => {
            this.nextSlide.emit()
        }, 500);
    }
    
    mainImageNeeded(radioElem) {
        if (radioElem.imgs && radioElem.imgs[1]) {
            return this.parentForm.controls[this.radio.name].value != radioElem.label;
        } else if (radioElem.imgs) {
            return true;
        }
        return false;
    }
}
