import {Component, Input} from "@angular/core";
import {ITextArea} from "./form-interface";

@Component({
    selector: 'textarea-component',
    template: `<textarea
        id="{{ta.id}}"
        placeholder="{{ta.placeHolder}}"
        maxLength="ta.length"
        rows="{{ta.rows}}"
        [attr.required]="ta.required ? 'required' : null"></textarea>`
})

export class TextAreaComponent{
    @Input() ta:ITextArea;
}
