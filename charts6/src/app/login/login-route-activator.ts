import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserAnthentityService } from './user-anthentity.service';

export const loginGuard: CanActivateFn = () => {
    const auth = inject(UserAnthentityService);
    const router = inject(Router);
    if (auth.isLogin()) return true;
    router.navigate(['login']);
    return false;
};
