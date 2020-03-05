import {
    AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, ViewChild,
    ViewChildren
} from "@angular/core";
import {VideoService} from "./video.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'foot-image',
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
    isSamsungDevice:boolean = navigator.userAgent.indexOf(' SM-') > -1;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.updateCanvasSize();
        setTimeout(this.updateCanvasElements.bind(this), 0); //wait for resize to finish
    }

    constructor(private videoService: VideoService) {
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
            this.initThumbnailPlaceHolder();
        }.bind(this));
        this.parentForm.addControl('image0', new FormControl());
        this.parentForm.addControl('image1', new FormControl());
        this.parentForm.addControl('image2', new FormControl());
    }

    ngOnInit() {
        this.videoService.change.subscribe(function (event) {
            this.updateImageFromVideo(event);
        }.bind(this));
        this.videoService.cameraOn.subscribe(function () {
            this.killVideo = false
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

    rotateImage(canvasContext, x, y, rotateAngel, currentImage, canvasWidth, canvasHeight){
      canvasContext.translate(x, y);
      canvasContext.rotate(rotateAngel); // clockwise
      //x and y as width and height replaced because the core image is rotated so we need to compensate for it
      canvasContext.drawImage(currentImage, -y, -x, canvasHeight, canvasWidth);
      // reset rotation for next image
      canvasContext.rotate(-rotateAngel); // counter clockwise
      canvasContext.translate(-x, -y);
    }

    updateCanvasElements(isPlaceHolder?) {
      this.canvasContext.clearRect(0,0,this.canvasParams.canvasWidth, this.canvasParams.canvasHeight);
        //image
        if (this.canvasParams.images[this.currentCameraInput]) {
          let canvasWidth = this.canvasParams.canvasWidth;
          let canvasHeight = this.canvasParams.canvasHeight;
          let currentImage = this.canvasParams.images[this.currentCameraInput];
          if(this.isSamsungDevice && !isPlaceHolder && false) {
            console.log('draw rotate');

            // Samsung devices rotate images for browser. their bad my fix
            let x = this.canvasParams.canvasWidth / 2;
            let y = this.canvasParams.canvasHeight / 2;
            let rotateAngel = 90 * Math.PI / 180;

            this.rotateImage(this.canvasContext, x, y, rotateAngel, currentImage, canvasWidth, canvasHeight);
          } else {
            console.log('draw regular');
            this.canvasContext.drawImage(currentImage, 0,0, canvasWidth, canvasHeight);
          }
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
            }.bind(this);
        }.bind(this));
    }

    updateCanvasThumbnails(image, index, isPlaceHolders?) {
        let thumbContext = this.thumbnailGalleryItem.toArray()[index].nativeElement.getContext('2d');

        if(this.isSamsungDevice && !isPlaceHolders){
          this.rotateImage(thumbContext, 50, 50 , 90 * Math.PI / 180 ,image, 100, 100);
        } else {
          thumbContext.drawImage(image, 0, 0, 100, 100);
        }
    }

    drew(image, index) {
        this.thumbnailGalleryAmount[index].imageTaken=true;
        this.currentCameraInput = index;
        this.canvasParams.images[this.currentCameraInput] = image;
        this.updateCanvasThumbnails(image, index);
        this.updateCanvasElements();
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
            }.bind(this, img);
            img.onerror = this.failed;
            img.src = `assets/SoftwareIcons_S${i + 1}.png`;
        }
    }
}
