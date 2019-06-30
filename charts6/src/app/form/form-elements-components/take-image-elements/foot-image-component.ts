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
    @ViewChild('canvas') canvas: ElementRef;
    @ViewChildren('thumbnailGalleryItem') thumbnailGalleryItem: QueryList<any>;
    @Input() parentForm: FormGroup;
    
    currentCameraInput: number;
    canvasContext;
    killVideo = true;
    cameraOn: boolean = false;
    canvasParams = {
        right: 280,
        left: 20,
        images: [],
        canvasWidth: 0,
        canvasHight: 0
    };
    
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
            // this.updateCanvasElements();
            setTimeout(this.updateCanvasElements.bind(this, this.currentCameraInput), 0); //wait for resize to finish
            this.canvasParams.images = ['../../../../assets/SoftwareIcons_Type01.png',
                '../../../../assets/SoftwareIcons_Type01.png',
                '../../../../assets/SoftwareIcons_Type01.png'];
            // this.initThumbnailPlaceHolder('../../../../assets/SoftwareIcons_Type01.png');
            this.initThumbnailPlaceHolder();
        }.bind(this));
        this.parentForm.addControl('image0', new FormControl());
        this.parentForm.addControl('image1', new FormControl());
        this.parentForm.addControl('image2', new FormControl());
    }
    
    ngOnInit() {
        this.videoService.change.subscribe(function (event) {
            this.updateImageFromVideo(event);
            this.killVideo = true;
        }.bind(this));
        // this.videoService.change.subscribe(.bind(this));
        this.videoService.cameraOn.subscribe(function () {
            this.killVideo = false
        }.bind(this));
    }
    
    activateCamera(event, index) {
        console.log(index);
        this.currentCameraInput = index;
        this.cameraOn = true;
        this.videoService.activeCamera();
    }
    
    updateCanvasSize() {
        this.canvasParams.canvasWidth = Math.floor(this.canvas.nativeElement.offsetWidth);
        this.canvasParams.canvasHight = Math.floor(this.canvas.nativeElement.offsetHeight);
    }
    
    updateLine(event) {
        event.preventDefault();
        this.canvasContext.clearRect(0, 0, this.canvasParams.canvasWidth, this.canvasParams.canvasHight);
        if (event.offsetX > this.canvasParams.canvasWidth / 2) {
            this.canvasParams.right = event.offsetX;
        } else {
            this.canvasParams.left = event.offsetX;
        }
        
        this.updateCanvasElements();
    }
    
    updateCanvasElements() {
        //image
        if (this.canvasParams.images[this.currentCameraInput]) {
            this.canvasContext.drawImage(this.canvasParams.images[this.currentCameraInput], 0, 0, this.canvasParams.canvasWidth, this.canvasParams.canvasHight);
        }
        
        //right
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.setLineDash([5, 3]);
        this.canvasContext.moveTo(this.canvasParams.right, 0);
        this.canvasContext.lineTo(this.canvasParams.right, this.canvasParams.canvasHight);
        this.canvasContext.stroke();
        
        //left
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.setLineDash([5, 3]);
        this.canvasContext.moveTo(this.canvasParams.left, 0);
        this.canvasContext.lineTo(this.canvasParams.left, this.canvasParams.canvasHight);
        this.canvasContext.stroke();
    }
    
    updateImageFromVideo(videoElement) {
        this.cameraOn = false;
        this.drew(videoElement, this.currentCameraInput);
    }
    
    updateImageFromFile(event, index) {
        var img = new Image();
        img.onload = this.drew.bind(this, img, index);
        img.onerror = this.failed;
        img.src = URL.createObjectURL(event.target.files[0]);
    }
    
    updateFormWithImage(image, index) {
        this.parentForm.controls[`image${index}`].setValue(image);
    }
    
    updateCanvasThumbnails(image, index) {
        console.log(image);
        console.log(index);
        console.log(this.thumbnailGalleryItem);
        console.log(this.thumbnailGalleryItem.toArray()[index].nativeElement);
        let thumbContext = this.thumbnailGalleryItem.toArray()[index].nativeElement.getContext('2d');
        console.log(thumbContext);
        thumbContext.drawImage(image, 0, 0, 100, 100);
    }
    
    drew(image, index) {
        console.log('%c'+index,'background-color:green;font-size:16px;color:#fff');
        this.currentCameraInput = index;
        this.canvasParams.images[this.currentCameraInput] = image;
        this.updateCanvasThumbnails(image, index);
        // this.updateCanvasElements();
        // this.updateFormWithImage(image, index);
        
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
    
    initThumbnailPlaceHolder(fileDir) {
        var img = new Image();
        img.onload = function (img) {
            this.canvasParams.images.push(img);
            this.canvasParams.images.push(img);
            this.canvasParams.images.push(img);
        }.bind(this, img);
        img.onerror = this.failed;
        img.src = fileDir;
    }
}
