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
    TextAreaComponent,
    InputComponent,
    SimpleFormComponent,
    SelectComponent,
    BirthdayInputComponent
} from "./form";
import {
    LoginComponent,
    UserAnthentityService,
    LoginRouteActivatorService
} from "./login";
import {VideoService} from "./form/form-elements-components/take-image-elements";
import {SuccessPageComponent} from "./final-page/success-page-component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MidrasFormComponent,
        SimpleFormComponent,
        RadioComponent,
        TextAreaComponent,
        FootImageComponent,
        VideosComponent,
        InputComponent,
        SelectComponent,
        SuccessPageComponent,
        BirthdayInputComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        UserAnthentityService,
        LoginRouteActivatorService,
        FormService,
        VideoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
