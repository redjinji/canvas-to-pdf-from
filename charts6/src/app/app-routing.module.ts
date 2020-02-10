import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MidrasFormComponent} from "./form/midras-form.component";
import {LoginRouteActivatorService} from "./login/login-route-activator.service";
import {SuccessPageComponent} from "./final-page/success-page-component";
import {RejectPageComponent} from "./final-page/reject-page-component";

const routes: Routes = [
    {path:'', redirectTo:'form',pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'form', component:MidrasFormComponent, canActivate:[LoginRouteActivatorService]},
    {path:'success-form', component:SuccessPageComponent},
    {path:'reject-form', component:RejectPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

    constructor(){
    }
}
