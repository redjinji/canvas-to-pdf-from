import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {UserAnthentityService} from "./user-anthentity.service";

@Injectable()
export class LoginRouteActivatorService implements CanActivate {
    constructor(private auth:UserAnthentityService, private router:Router){
    
    }
    canActivate(route:ActivatedRouteSnapshot){
        if(this.auth.isLogin()) {
            return true;
        }
        this.router.navigate(['login'])
    }
    
    canDeactivate(route:ActivatedRouteSnapshot){
        if(this.auth.isLogin()) {
            this.router.navigate(['form'])
        }
        return true;
    }
}
