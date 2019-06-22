import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {UserAnthentityService} from "../login";
import {IFormElement} from "./form-elements-components";
import {FormService} from "./form.service";
import {VideoService} from "./form-elements-components/take-image-elements";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector:'midras-form',
    templateUrl: './midras-form.component.html',
    styleUrls: ['./midras-form.component.scss']
})

export class MidrasFormComponent implements OnInit {
    parentForm: FormGroup;
    formElements:IFormElement[];
    currentIndex = 0;
    prevDisable = true;
    nextDisable = false;
    killVideo= false;
    @ViewChild('screenContainer') screenContainer:ElementRef;
    constructor(private router:Router, private auth:UserAnthentityService,
                private formService:FormService,
                private videoService:VideoService,
                private formBuilder:FormBuilder){
    }
    
    ngOnInit():void{
        const isUserLogin = this.auth.isLogin();
        if(!isUserLogin) this.router.navigate(['/login']);
        
        this.getElement();
        this.parentForm = this.formBuilder.group({});
        this.videoService.change.subscribe(function(){this.killVideo = true}.bind(this));
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
        console.log(this.parentForm);
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
    
}
