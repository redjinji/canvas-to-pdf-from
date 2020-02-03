import {Component, Input, ViewEncapsulation} from "@angular/core";
import {ICustomerDetails} from "./form-interface";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'simple-form',
    templateUrl: 'simple-form.component.html',
    styleUrls: ['./simple-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SimpleFormComponent {
    @Input() customerForm: ICustomerDetails[];
    @Input() parentForm:FormGroup;
}
