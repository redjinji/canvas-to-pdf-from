import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MidrasFormComponent } from './form/midras-form.component';
import { loginGuard } from './login/login-route-activator';
import { SuccessPageComponent } from './final-page/success-page-component';
import { RejectPageComponent } from './final-page/reject-page-component';

export const routes: Routes = [
    {path:'', redirectTo:'form', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'form', component:MidrasFormComponent, canActivate:[loginGuard]},
    {path:'success-form', component:SuccessPageComponent},
    {path:'reject-form', component:RejectPageComponent}
];
