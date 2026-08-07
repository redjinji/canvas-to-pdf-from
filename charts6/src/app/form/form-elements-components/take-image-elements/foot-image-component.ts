import {
    AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, ViewChild,
    ViewChildren
} from "@angular/core";
import {VideoService} from "./video.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ImageComponent} from "../../../helper-component/image-component";
import {VideosComponent} from "./videos.component";

@Component({
    selector: 'foot-image',
    imports: [CommonModule, ReactiveFormsModule, ImageComponent, VideosComponent],
    templateUrl: 'foot-image-component.html',
    styleUrls: ['./foot-image.component.scss']
})

export class FootImageComponent implements OnInit, AfterViewInit {
    @ViewChild('canvas', { static: true }) canvas: ElementRef;
    @ViewChildren('thumbnailGalleryItem') thumbnailGalleryItem: QueryList<any>;
    @Input() parentForm: FormGroup;

    currentCameraInput: number = 0;
    canvasContext;
    killVideo = true;
    cameraOn: boolean = false;
    canvasParams = {
        right: 280,
        left: 20,
        images: [],
        canvasWidth: 0,
        canvasHeight: 0
    };
    thumbnailGalleryAmount = [];
    svgFile = [{svg: 'attached'}];
    svgCamera = [{svg: 'camera'}];

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.updateCanvasSize();
        setTimeout(this.updateCanvasElements.bind(this), 0); //wait for resize to finish
    }

    constructor(private videoService: VideoService, private cdr: ChangeDetectorRef) {
        this.cameraOn = false;
    }

    ngAfterViewInit() {
        setTimeout(function () {
            this.updateCanvasSize();
            this.canvasParams.right = this.canvasParams.canvasWidth * 0.8;
            this.canvasParams.left = this.canvasParams.canvasWidth * 0.2;
            this.canvasContext = this.canvas.nativeElement.getContext('2d');
            this.thumbnailGalleryAmount = [
                [{svg: 'stand-regular', imageTaken: false}],
                [{svg: 'stand-knee', imageTaken: false}],
                [{svg: 'stand-toe', imageTaken: false}]
            ];

            // Angular >=18 ticks only marked views; this setTimeout callback (from
            // ngAfterViewInit, not this component's own template listener) sets
            // thumbnailGalleryAmount, whose *ngFor creates the #thumbnailGalleryItem
            // canvases that initThumbnailPlaceHolder()'s async img.onload callbacks
            // below need populated in the @ViewChildren QueryList — mark now so CD
            // creates those canvases before the images finish loading.
            this.cdr.markForCheck();
            this.initThumbnailPlaceHolder();
        }.bind(this));
        this.parentForm.addControl('image0', new FormControl());
        this.parentForm.addControl('image1', new FormControl());
        this.parentForm.addControl('image2', new FormControl());

        for (let i = 0; i < 3; i++) {
            this.parentForm.controls[`image${i}`].valueChanges.subscribe(value => {
                // Only a restored draft sets these controls from outside; a photo the
                // user takes goes through drew(), which flags imageTaken before the
                // control value lands here — skip those.
                if (!value || this.thumbnailGalleryAmount[i]?.['imageTaken']) return;
                const img = new Image();
                img.onload = () => {
                    this.applyImageToCanvasState(img, i);

                    // markForCheck: Image.onload callback, not a DOM event.
                    this.cdr.markForCheck();
                };
                img.src = value;
            });
        }
    }

    ngOnInit() {
        this.videoService.change.subscribe(function (event) {
            this.updateImageFromVideo(event);

            // Angular >=18 ticks only marked views; this subscription fires from
            // VideoService's EventEmitter (a service event, not a listener in this
            // component's own template), so mark explicitly.
            this.cdr.markForCheck();
        }.bind(this));
        this.videoService.cameraOn.subscribe(function () {
            this.killVideo = false

            // Angular >=18 ticks only marked views; service EventEmitter subscription.
            this.cdr.markForCheck();
        }.bind(this));
        this.parentForm.addControl('legLine', new FormControl());
    }

    activateCamera(event, index) {
        this.currentCameraInput = index;
        this.cameraOn = true;
        this.videoService.activeCamera();
    }

    updateCanvasSize() {
        this.canvasParams.canvasWidth = Math.floor(this.canvas.nativeElement.offsetWidth);
        this.canvasParams.canvasHeight = Math.floor(this.canvas.nativeElement.offsetHeight);
    }

    updateLine(event) {
        event.preventDefault();
        this.canvasContext.clearRect(0, 0, this.canvasParams.canvasWidth, this.canvasParams.canvasHeight);
        if (event.offsetX > this.canvasParams.canvasWidth / 2) {
            this.canvasParams.right = event.offsetX;
        } else {
            this.canvasParams.left = event.offsetX;
        }

        this.updateCanvasElements();
    }

    updateCanvasElements(isPlaceHolder?) {
      this.canvasContext.clearRect(0,0,this.canvasParams.canvasWidth, this.canvasParams.canvasHeight);
        //image
        if (this.canvasParams.images[this.currentCameraInput]) {
          let canvasWidth = this.canvasParams.canvasWidth;
          let canvasHeight = this.canvasParams.canvasHeight;
          let currentImage = this.canvasParams.images[this.currentCameraInput];
          this.canvasContext.drawImage(currentImage, 0,0, canvasWidth, canvasHeight);
        }

        //right
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.setLineDash([5, 3]);
        this.canvasContext.moveTo(this.canvasParams.right, 0);
        this.canvasContext.lineTo(this.canvasParams.right, this.canvasParams.canvasHeight);
        this.canvasContext.lineWidth = 4;
        this.canvasContext.stroke();

        //left
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.setLineDash([5, 3]);
        this.canvasContext.moveTo(this.canvasParams.left, 0);
        this.canvasContext.lineTo(this.canvasParams.left, this.canvasParams.canvasHeight);
        this.canvasContext.lineWidth = 4;
        this.canvasContext.stroke();
    }

    updateImageFromVideo(videoElement) {
        this.drew(videoElement, this.currentCameraInput);
        this.cameraOn = false;
        this.killVideo = true;
    }

    updateImageFromFile(event, index) {
      window['loadImage'](event.target.files[0], img => {
        this.drew(img, index)

        // Angular >=18 ticks only marked views; callback from the loadImage
        // third-party library, not this component's own template listener.
        this.cdr.markForCheck();
      }, {
        maxWidth: this.canvasParams.canvasWidth,
        orientation: true
      });
    }

    updateFormWithImage(image, index) {
        this.canvas.nativeElement.toBlob(function (blob) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onloadend = function () {
                let base64data = fileReader.result;
                this.parentForm.controls[`image${index}`].setValue(base64data);

                // Angular >=18 ticks only marked views; canvas.toBlob -> FileReader.onloadend chain.
                this.cdr.markForCheck();
            }.bind(this);
        }.bind(this));
    }

    updateCanvasThumbnails(image, index, isPlaceHolders?) {
        let thumbContext = this.thumbnailGalleryItem.toArray()[index].nativeElement.getContext('2d');
        thumbContext.drawImage(image, 0, 0, 100, 100);
    }

    // Shared by drew() (user takes a photo) and the draft-restore subscription.
    applyImageToCanvasState(image, index) {
        this.thumbnailGalleryAmount[index]['imageTaken'] = true;
        this.currentCameraInput = index;
        this.canvasParams.images[index] = image;
        this.updateCanvasThumbnails(image, index);
        this.updateCanvasElements();
    }

    drew(image, index) {
        this.applyImageToCanvasState(image, index);
        this.updateFormWithImage(image, index);
    }

    failed() {
        console.log('dammmmm!');
    }

    isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    updateMainImage(index) {
        this.currentCameraInput = index;
        this.updateCanvasElements();
    }

    initThumbnailPlaceHolder() {
        for (let i = 0; i < 3; i++) {
            let img = new Image();
            img.onload = function (img) {
                this.canvasParams.images.push(img);
                this.updateCanvasThumbnails(img, i, true);
                this.updateCanvasElements(true);

                // Angular >=18 ticks only marked views; Image.onload callback.
                this.cdr.markForCheck();
            }.bind(this, img);
            img.onerror = this.failed;
            img.src = `assets/SoftwareIcons_S${i + 1}.png`;
        }
    }
}
