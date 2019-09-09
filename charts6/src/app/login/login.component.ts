import {Component} from "@angular/core";
import {UserAnthentityService} from "./user-anthentity.service";
import {Router} from "@angular/router";

@Component({
    selector: 'login-popup',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    userName;
    password;
    mouseoverLogin: boolean;
    constructor(private auth:UserAnthentityService, private router:Router){
        const lastLogin = JSON.parse(localStorage.getItem('userAuth'));
        if(lastLogin) {
            this.userName = lastLogin.userName;
            this.password = lastLogin.password;
        }
    
    }
    
    login(formValues){
        this.auth.updateCurrentUser(formValues.userName, formValues.password);
    }
}
