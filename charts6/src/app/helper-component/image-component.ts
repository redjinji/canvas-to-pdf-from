import {AfterContentInit, Component, Input, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IImage} from "../form/form-elements-components/form-interface";

@Component({
    selector: 'image-component',
    imports: [CommonModule],
    templateUrl: './image-component.html',
    styles: [`
    img {
        width: 100%;
    }
    svg {
        width: 100%;
        height: 100%;
    }
    `]
})

export class ImageComponent{
    @Input() image: IImage;
    @Input() checked: boolean = false;
}
