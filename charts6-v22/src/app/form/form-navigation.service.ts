import {EventEmitter, Injectable, Output} from "@angular/core";

// PLACEHOLDER: minimal stand-in so the Header component (ported in Task 10) can
// resolve its `formNavigationService: FormNavigationService` dependency and
// compile/render before the form engine is ported. Task 12 ports the real,
// byte-identical service from charts6/src/app/form/form-navigation.service.ts
// (which depends on FormService) and overwrites this file.
@Injectable({providedIn: 'root'})
export class FormNavigationService {
  currentPosition: number = 0;
  endNavigation: Boolean = false;
  startNavigation: Boolean = true;

  @Output() navigate: EventEmitter<{ position, start, end }> = new EventEmitter();

  goto(position) {
    this.currentPosition = position;
  }
}
