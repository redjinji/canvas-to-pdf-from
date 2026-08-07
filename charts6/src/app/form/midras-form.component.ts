import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild
} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, merge} from "rxjs";
import {Router} from "@angular/router";
import {UserAnthentityService} from "../login";
import {IFormElement} from "./form-elements-components";
import {FormService} from "./form.service";
import {VideoService} from "./form-elements-components/take-image-elements";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormNavigationService} from "./form-navigation.service";
import {RadioComponent} from "./form-elements-components/radio-component/radio.component";
import {TextAreaComponent} from "./form-elements-components/textArea.component";
import {FootImageComponent} from "./form-elements-components/take-image-elements/foot-image-component";
import {SimpleFormComponent} from "./form-elements-components/simple-form.component";
import {FormAutosaveService, FormDraft} from "./form-autosave.service";
import {FormSubmitService} from "./form-submit.service";

@Component({
  selector: 'midras-form',
  imports: [CommonModule, ReactiveFormsModule, RadioComponent, TextAreaComponent, FootImageComponent, SimpleFormComponent],
  templateUrl: './midras-form.component.html',
  styleUrls: ['./midras-form.component.scss']
})

export class MidrasFormComponent implements OnInit, AfterViewInit {
  parentForm: FormGroup;
  formElements: IFormElement[];
  prevDisable = true;
  nextDisable = false;
  activeSpinner = false;
  restorePromptVisible = false;
  private pendingDraft: FormDraft | null = null;
  private draftSaveSuspended = false;
  private destroyRef = inject(DestroyRef);

  @ViewChild('screenContainer', { static: true }) screenContainer: ElementRef;
  @ViewChild('overlaySpinner') overlaySpinner: ElementRef;

  constructor(private router: Router, private auth: UserAnthentityService,
              private formService: FormService,
              private videoService: VideoService,
              private formBuilder: FormBuilder,
              private fromNavigationService: FormNavigationService,
              private cdr: ChangeDetectorRef,
              private autosave: FormAutosaveService,
              private formSubmit: FormSubmitService) {

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

    this.autosave.loadDraft().then(draft => {
      if (draft && Object.values(draft.values).some(value => value)) {
        this.pendingDraft = draft;
        this.restorePromptVisible = true;
      } else {
        this.startAutosave();
      }
      // Angular >=18 ticks only marked views; promise callback, not a template listener.
      this.cdr.markForCheck();
    });
  }

  getElement() {
    this.formElements = this.formService.getFormElements();
  }

  formMoveTo(params) {
    const {position, start, end} = params;
    this.screenContainer.nativeElement.style = `transform: translateX(${position}00%)`;
    this.nextDisable = end;
    this.prevDisable = start;

    // Angular >=18 ticks only marked views; this subscription also fires when
    // navigation is driven from Header's nav buttons (a sibling component's click,
    // not this component's own template listener), so mark explicitly.
    this.cdr.markForCheck();
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
      this.draftSaveSuspended = true;
      this.formSubmit.submit(this.parentForm.value).subscribe(
        response => {
          if (response.status === 'fail') {
            this.draftSaveSuspended = false;
            console.log(response);
            this.router.navigate(['/reject-form']);
          } else {
            this.router.navigate(['/success-form']);
          }
        },
        error => {
          this.draftSaveSuspended = false;
          console.log(error);
          this.router.navigate(['/reject-form']);
        }
      );
      this.activeSpinner = true;
    }
  }

  restoreDraft() {
    const draft = this.pendingDraft;
    this.restorePromptVisible = false;
    this.pendingDraft = null;
    this.autosave.applyDraft(this.parentForm, draft.values);
    this.fromNavigationService.goto(draft.step);
    this.startAutosave();
  }

  startFresh() {
    this.restorePromptVisible = false;
    this.pendingDraft = null;
    this.autosave.clearDraft();
    this.startAutosave();
  }

  private startAutosave() {
    merge(this.parentForm.valueChanges, this.fromNavigationService.navigate)
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.draftSaveSuspended) return;
        this.autosave.saveDraft({
          values: this.parentForm.value,
          step: this.fromNavigationService.currentPosition
        });
      });
  }
}
