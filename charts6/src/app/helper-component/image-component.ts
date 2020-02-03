import {AfterContentInit, Component, Input, OnInit} from "@angular/core";
import {IImage} from "../form/form-elements-components";

@Component({
    selector: 'image-component',
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
}
