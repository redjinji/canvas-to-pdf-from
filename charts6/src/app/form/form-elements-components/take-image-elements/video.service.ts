import {Injectable, Output, EventEmitter} from "@angular/core";

@Injectable()
export class VideoService {
    imageData: any;
    @Output() change:EventEmitter<Boolean> = new EventEmitter();
    
    done(event){
        this.change.emit(event);
    
    }
}
