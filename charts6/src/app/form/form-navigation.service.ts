import {EventEmitter, Injectable, OnInit, Output} from "@angular/core";
import {FormService} from "./form.service";

@Injectable()
export class FormNavigationService {
    currentPosition: number = 0;
    endNavigation: Boolean = false;
    startNavigation: Boolean = true;
    
    @Output() navigate: EventEmitter<{ position, start, end }> = new EventEmitter();
    
    constructor(private formService: FormService) {
    }
    
    next() {
        this.currentPosition += 1;
        this.goto(this.currentPosition);
    }
    
    prev() {
        this.currentPosition -= 1;
        this.goto(this.currentPosition);
    }
    
    goto(position) {
        this.currentPosition = position;
        if (this.currentPosition === 0) {
            this.startNavigation = true;
            this.endNavigation = false;
        } else if (this.currentPosition === this.formService.getLength() - 1) {
            this.startNavigation = false;
            this.endNavigation = true;
        } else {
            this.startNavigation = false;
            this.endNavigation = false;
        }
        
        this.navigate.emit({
            position: this.currentPosition,
            start: this.startNavigation,
            end: this.endNavigation
        });
    }
    
    
}
