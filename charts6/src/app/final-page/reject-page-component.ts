import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'reject-form-page',
    templateUrl: './reject-form-page.html',
    styleUrls: ['./reject-form-page.scss']
})

export class RejectPageComponent {
    constructor(private router:Router){
    }
}
