import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {IUser, IUserResponse} from "./login.model";
import {environment} from "../../environments/environment";

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
            password: password,
            mail:''
        };

        this.isAuthenticated().then(value => {
            if(value.isAuthentic){
                this.currentUser.mail = value.mail;
                localStorage.setItem('userAuth', JSON.stringify(this.currentUser));
                this.router.navigate(['form'])
            } else {
                console.log(false);
            }
        });
    }

    isLogin() {
        return this.loginAlready;
    }

    isAuthenticated() {
        return new Promise<IUserResponse>(function (resolve, reject) {
            let formData = new FormData();
            formData.append('userName', this.currentUser.userName);
            formData.append('password', this.currentUser.password);

            var xhr = new XMLHttpRequest;
            xhr.open('POST', `${environment.serverCall}/get-user-sheets`, true);
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var res = JSON.parse(xhr.response);
                    if (res.isAuthentic) {
                        this.loginAlready = true;
                        resolve(res);
                    } else {
                        resolve({isAuthentic:false});
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
