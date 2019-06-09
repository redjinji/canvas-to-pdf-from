import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {UserAnthentityService} from "../login";
import {IFormElement} from "./form-elements-components";
import {FormService} from "./form.service";

@Component({
    selector:'midras-form',
    templateUrl: './midras-form.component.html',
    styleUrls: ['./midras-form.component.scss']
})

export class MidrasFormComponent implements OnInit{
    formElements:IFormElement[];
    currentIndex = 0;
    prevDisable = true;
    nextDisable = false;
    @ViewChild('screenContainer') screenContainer:ElementRef;
    constructor(private router:Router, private auth:UserAnthentityService, private formService:FormService){
    
    }
    
    ngOnInit():void{
        const isUserLogin = this.auth.isLogin();
        if(!isUserLogin) this.router.navigate(['/login']);
        
        this.getElement();
    }
    
    getElement(){
        this.formElements = this.formService.getFormElements();
    }
    
    nextStep(){
        if((this.formElements.length-1) > this.currentIndex) {
            this.prevDisable = false;
            this.currentIndex++;
            this.screenContainer.nativeElement.style = `transform: translateX(${this.currentIndex}00%)`
            this.nextDisable = !((this.formElements.length-1) > this.currentIndex);
        } else {
            this.nextDisable = true;
        }
    }
    
    prevStep(){
        if(this.currentIndex > 0) {
            this.nextDisable = false;
            this.currentIndex--;
            this.screenContainer.nativeElement.style = `transform: translateX(${this.currentIndex}00%)`
            this.prevDisable = !(this.currentIndex > 0);
        } else {
            this.prevDisable = true;
        }
    }
    
    captureImage(data){
        console.log('parent video:',data);
    }
    
}
