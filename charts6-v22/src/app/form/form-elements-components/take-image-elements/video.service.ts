import {EventEmitter, Injectable, Output} from "@angular/core";

// PLACEHOLDER: minimal stand-in so MidrasFormComponent (ported in Task 12) and FootImageComponent
// can resolve their VideoService dependency before the real camera-capture engine is ported.
// Task 13 ports the real, byte-identical service from
// charts6/src/app/form/form-elements-components/take-image-elements/video.service.ts and
// overwrites this file. Kept providedIn:'root' (the old app.module.ts provided this at the root
// injector) and the same EventEmitter shape so subscribers compile unchanged.
@Injectable({providedIn: 'root'})
export class VideoService {
  imageData: any;
  @Output() change: EventEmitter<Boolean> = new EventEmitter();
  @Output() cameraOn: EventEmitter<Boolean> = new EventEmitter();

  done(event) {
    this.change.emit(event);
  }
  activeCamera() {
    this.cameraOn.emit();
  }
}
