import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IRadio} from "./form-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
    selector: 'input-radio',
    template: `
        <input (change)="handleChage($event)" type="radio" id="{{radio.id}}" name="{{radio.name}}" value="{{radio.text}}" required>
        <label for="{{radio.id}}">{{radio.label}}</label>
    `,
    styleUrls:['./radio.scss']
})
export class RadioComponent implements OnInit{
    @Input() radio: IRadio;
    @Output() nextSlide = new EventEmitter();
    radioForm: FormGroup;
    inputRadio: FormControl;
    
    ngOnInit(){
        this.inputRadio = new FormControl('',Validators.required);
        this.radioForm = new FormGroup({
            inputRadio: this.inputRadio
        })
    }
    
    handleChage(event){
        setTimeout(function(){this.nextSlide.emit()}.bind(this),500);
    }
}
