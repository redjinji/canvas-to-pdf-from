import {Component, Input, OnInit} from "@angular/core";
import {IInput} from "./form-interface";

@Component({
    selector: 'input-component',
    template: `
        <label for="{{inputElem.id}}"> {{inputElem.label}}
        </label>
        <input [attr.required]="inputElem.required"
         [attr.max]="inputElem.maxDate ? inputElem.maxDateParsed : null"
         [attr.min]="inputElem.maxDate ? '1900-01-01' : null"
         id="{{inputElem.id}}" type="{{inputElem.type}}" name="{{inputElem.name}}"
         [attr.placeholder]="inputElem.placeholder ? inputElem.placeholder : null"/>
    `
})
export class InputComponent implements OnInit{
    @Input() inputElem: IInput;
    
    ngOnInit(){
        if(this.inputElem.maxDate) {
            let day:any;
            let mounth:any;
            
            day = this.inputElem.maxDate.getDate();
            mounth = this.inputElem.maxDate.getMonth()+1;
            const year = this.inputElem.maxDate.getFullYear();
            
            day = day < 10 ? '0'+day : day;
            mounth = mounth < 10 ? '0'+mounth : mounth;
            const date = `${year}-${mounth}-${day}`;
            this.inputElem.maxDateParsed = date;
        }
    }
    
}
