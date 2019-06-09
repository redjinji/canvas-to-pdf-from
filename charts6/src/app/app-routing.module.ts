import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MidrasFormComponent} from "./form/midras-form.component";
import {LoginRouteActivatorService} from "./login/login-route-activator.service";

const routes: Routes = [
    {path:'', redirectTo:'form',pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'form', component:MidrasFormComponent, canActivate:[LoginRouteActivatorService]}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    
    constructor(){
    }
}
