import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {UserAnthentityService} from "../login";
import {IFormElement} from "./form-elements-components";
import {FormService} from "./form.service";
import {VideoService} from "./form-elements-components/take-image-elements";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
    selector:'midras-form',
    templateUrl: './midras-form.component.html',
    styleUrls: ['./midras-form.component.scss']
})

export class MidrasFormComponent implements OnInit, AfterViewInit {
    parentForm: FormGroup;
    formElements:IFormElement[];
    currentIndex = 0;
    prevDisable = true;
    nextDisable = false;
    activeSpinner = false;
    url: string = `${environment.serverCall}/sendForm`;
    
    @ViewChild('screenContainer') screenContainer:ElementRef;
    @ViewChild('overlaySpinner') overlaySpinner:ElementRef;
    
    constructor(private router:Router, private auth:UserAnthentityService,
                private formService:FormService,
                private videoService:VideoService,
                private formBuilder:FormBuilder,
                private _http: HttpClient){
    }
    
    ngAfterViewInit(){
        this.parentForm.removeControl('inValidForInit');
    }
    
    ngOnInit():void{
        const isUserLogin = this.auth.isLogin();
        if(!isUserLogin) this.router.navigate(['/login']);

        this.getElement();
        this.parentForm = this.formBuilder.group({inValidForInit:new FormControl('',Validators.required)});
    }
    
    getElement(){
        this.formElements = this.formService.getFormElements();
    }
    
    nextStep(formElem, elemClick){
        if((this.formElements.length-1) > this.currentIndex) {
            this.prevDisable = false;
            this.currentIndex++;
            this.screenContainer.nativeElement.style = `transform: translateX(${this.currentIndex}00%)`;
            this.nextDisable = !((this.formElements.length-1) > this.currentIndex);
        } else {
            this.nextDisable = true;
        }
    }
    
    prevStep(){
        if(this.currentIndex > 0) {
            this.nextDisable = false;
            this.currentIndex--;
            this.screenContainer.nativeElement.style = `transform: translateX(${this.currentIndex}00%)`;
            this.prevDisable = !(this.currentIndex > 0);
        } else {
            this.prevDisable = true;
        }
    }
    
    captureImage(data){
        console.log('parent video:',data);
    }
    
    sendForm(){
        if(this.parentForm.valid) {
            let formData = new FormData();
            for(let formItem in this.parentForm.value){
                formData.append(formItem, this.parentForm.value[formItem])
            }
    
            this._http.post(this.url,formData).subscribe(
                respone => console.log(respone),
                error => console.log(error)
            );
            this.activeSpinner= true;
            setTimeout(() => this.router.navigate(['/success-form']), 3000)
        }
    }
}
