import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {UserAnthentityService} from "../login";
import {IFormElement} from "./form-elements-components";
import {FormService} from "./form.service";
import {VideoService} from "./form-elements-components/take-image-elements";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FormNavigationService} from "./form-navigation.service";

interface FormResponse {
  status: string;
  error?: any;
}

@Component({
  selector: 'midras-form',
  templateUrl: './midras-form.component.html',
  styleUrls: ['./midras-form.component.scss']
})

export class MidrasFormComponent implements OnInit, AfterViewInit {
  parentForm: FormGroup;
  formElements: IFormElement[];
  prevDisable = true;
  nextDisable = false;
  activeSpinner = false;
  url: string = `${environment.serverCall}/sendForm`;

  @ViewChild('screenContainer', { static: true }) screenContainer: ElementRef;
  @ViewChild('overlaySpinner') overlaySpinner: ElementRef;

  constructor(private router: Router, private auth: UserAnthentityService,
              private formService: FormService,
              private videoService: VideoService,
              private formBuilder: FormBuilder,
              private fromNavigationService: FormNavigationService,
              private _http: HttpClient) {

    fromNavigationService.navigate.subscribe(this.formMoveTo.bind(this))
  }

  ngAfterViewInit() {
    this.parentForm.removeControl('inValidForInit');
  }

  ngOnInit(): void {
    const isUserLogin = this.auth.isLogin();
    if (!isUserLogin) this.router.navigate(['/login']);

    this.getElement();
    this.parentForm = this.formBuilder.group({inValidForInit: new FormControl('', Validators.required)});
    window['activeForm'] = this.parentForm;
  }

  getElement() {
    this.formElements = this.formService.getFormElements();
  }

  formMoveTo(params) {
    const {position, start, end} = params;
    this.screenContainer.nativeElement.style = `transform: translateX(${position}00%)`;
    this.nextDisable = end;
    this.prevDisable = start;
  }

  nextStep() {
    this.fromNavigationService.next();
  }

  prevStep() {
    this.fromNavigationService.prev();
  }

  captureImage(data) {
    console.log('parent video:', data);
  }

  sendForm() {
    if (this.parentForm.valid) {
      const formData = new FormData();
      const fieldAgent = JSON.parse(localStorage.getItem('userAuth'));

      formData.append('fieldAgentName', fieldAgent.userName);
      formData.append('fieldAgentMail', fieldAgent.mail);
      formData.append('submitTime', new Date().toLocaleString('he-il'));
      for (const formItem in this.parentForm.value) {
        formData.append(formItem, this.parentForm.value[formItem] || '');
      }

      this._http.post(this.url, formData).subscribe(
        (response: FormResponse) => {
          if (response.status === 'fail') {
            console.log(response);
            this.router.navigate(['/reject-form']);
          } else {
            this.router.navigate(['/success-form']);
          }
        },
        error => {
          console.log(error);
          this.router.navigate(['/reject-form']);
        }
      );
      this.activeSpinner = true;
    }
  }
}
