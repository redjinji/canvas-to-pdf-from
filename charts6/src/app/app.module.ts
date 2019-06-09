import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
    MidrasFormComponent,
    FormService,
    RadioComponent,
    FootImageComponent,
    VideosComponent,
    TextAreaComponent
} from "./form";
import {
    LoginComponent,
    UserAnthentityService,
    LoginRouteActivatorService
} from "./login";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MidrasFormComponent,
        RadioComponent,
        TextAreaComponent,
        FootImageComponent,
        VideosComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        UserAnthentityService,
        LoginRouteActivatorService,
        FormService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
