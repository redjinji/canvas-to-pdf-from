import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

// PLACEHOLDER: minimal stand-in so MidrasFormComponent (ported in Task 12) can resolve its
// <foot-image> template dependency before the real camera-capture component is ported. Task 13
// ports the real, byte-identical component from
// charts6/src/app/form/form-elements-components/take-image-elements/foot-image-component.ts
// (+ .html/.scss) and overwrites this file. Kept the [parentForm] input so the binding in
// midras-form.component.html compiles; template intentionally inert (renders nothing) until then.
@Component({
  selector: 'foot-image',
  template: ''
})
export class FootImageComponent {
  @Input() parentForm: FormGroup;
}
