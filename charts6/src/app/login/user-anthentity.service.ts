import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {IUser} from "./login.model";

@Injectable()
export class UserAnthentityService {
    loginAlready: boolean = false;
    currentUser: IUser;
    
    constructor(private router: Router) {
    
    }
    
    canActivate(route: ActivatedRouteSnapshot) {
        if (!this.isAuthenticated()) {
            console.log(true);
            return true
        } else {
            this.router.navigate(['/login'])
        }
    }
    
    updateCurrentUser(userName: string, password: string) {
        this.currentUser = {
            userName: userName,
            password: password
        };
        
        localStorage.setItem('userAuth', JSON.stringify(this.currentUser));
        this.isAuthenticated().then(value => {
            if(value){
                this.router.navigate(['form'])
            } else {
                console.log(false);
            }
        });
    }
    
    isLogin() {
        // return true;
        return this.loginAlready;
    }
    
    isAuthenticated() {
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            formData.append('userName', this.currentUser.userName);
            formData.append('password', this.currentUser.password);
            
            var xhr = new XMLHttpRequest;
            xhr.open('POST', 'http://localhost:3000/get-user-sheets', true);
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var res = JSON.parse(xhr.response);
                    if (res.user === 'authentic') {
                        this.loginAlready = true;
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            }.bind(this);
            xhr.send(formData);
        }.bind(this))
        /*const localUser = localStorage.getItem('userAuth');
        if (localUser) {
            console.log('call server');
            this.router.navigate(['/form']);
            return true;
        } else if (this.currentUser) {
            console.log('call to server with what we have');
            return false;
        } else {
            console.log('stay and login');
            return false
        }*/
    }
}
