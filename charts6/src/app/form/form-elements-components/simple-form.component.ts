import {Component, Input, ViewEncapsulation} from "@angular/core";
import {ICustomerDetails} from "./form-interface";
import {CommonModule} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RadioComponent} from "./radio-component/radio.component";
import {TextAreaComponent} from "./textArea.component";
import {InputComponent} from "./input.component";
import {BirthdayInputComponent} from "./birthday-input.component";
import {SelectComponent} from "./select.component";

@Component({
    selector: 'simple-form',
    imports: [CommonModule, ReactiveFormsModule, RadioComponent, TextAreaComponent, InputComponent, BirthdayInputComponent, SelectComponent],
    templateUrl: 'simple-form.component.html',
    styleUrls: ['./simple-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SimpleFormComponent {
    @Input() customerForm: ICustomerDetails[];
    @Input() parentForm:FormGroup;
}
