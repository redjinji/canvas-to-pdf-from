import {Component, Input} from "@angular/core";
import {ICustomerDetails} from "./form-interface";

@Component({
    selector: 'simple-form',
    templateUrl: 'simple-form.component.html',
    styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent {
    @Input() customerForm: ICustomerDetails[];
}
