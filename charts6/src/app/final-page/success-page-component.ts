import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'success-form-page',
    templateUrl: './success-form-page.html',
    styleUrls: ['./success-form-page.scss']
})

export class SuccessPageComponent {
    constructor(private router:Router){
    }
    
}
