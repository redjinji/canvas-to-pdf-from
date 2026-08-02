import {Injectable} from "@angular/core";

// PLACEHOLDER: minimal stand-in so the Header component (ported in Task 10) can
// resolve its `auth: UserAnthentityService` dependency and compile/render before
// login is ported. Task 11 ports the real, byte-identical service from
// charts6/src/app/login/user-anthentity.service.ts and overwrites this file.
@Injectable({providedIn: 'root'})
export class UserAnthentityService {
  isLogin() {
    return false;
  }
}
