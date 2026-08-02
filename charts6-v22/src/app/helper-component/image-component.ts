import {Component, Input} from "@angular/core";

// PLACEHOLDER: minimal stand-in so RadioComponent (ported in Task 12) can resolve its
// <image-component> template dependency before the real component is ported. Task 13 ports
// the real, byte-identical component from charts6/src/app/helper-component/image-component.ts
// (+ .html) and overwrites this file. Kept selector/inputs shape-compatible so callers bind
// cleanly; template intentionally inert (renders nothing) until then.
@Component({
  selector: 'image-component',
  template: ''
})
export class ImageComponent {
  @Input() image: any;
  @Input() checked: boolean = false;
}
