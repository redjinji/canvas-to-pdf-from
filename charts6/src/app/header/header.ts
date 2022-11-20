import {Component} from "@angular/core";
import {FormNavigationService} from "../form/form-navigation.service";
import {UserAnthentityService} from "../login";

@Component({
  selector: 'Header-component',
  templateUrl: './header.html'
})
export class Header {
  start: boolean = true;
  camera: boolean = false;
  angel: boolean = false;
  details: boolean = false;

  constructor(private formNavigationService: FormNavigationService, public auth: UserAnthentityService) {
    formNavigationService.navigate.subscribe(this.activeIcon.bind(this));
  }

  activeIcon(param) {
    this.start = false;
    this.camera = false;
    this.angel = false;
    this.details = false;

    switch (param.position) {
      case 6:
        this.camera = true;
        break;
      case 7:
        this.angel = true;
        break;
      case 8:
        this.details = true;
        break;
      default:
        this.start = true;
    }
  }

  goto(position) {
    this.formNavigationService.goto(position);
  }
}
