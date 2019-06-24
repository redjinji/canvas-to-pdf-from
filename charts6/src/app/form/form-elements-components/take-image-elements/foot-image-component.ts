import {AfterViewInit, Component, ElementRef, HostListener, OnChanges, OnInit, ViewChild} from "@angular/core";
import {VideoService} from "./video.service";

@Component({
    selector: 'foot-image',
    template: `
        <canvas #canvas [ngClass]="{'video-camera--on':!cameraOn}" (click)="updateLine($event)" [width]="canvasParams.canvasWidth" [height]="canvasParams.canvasHight"></canvas><br/>
        <video-capture *ngIf="!killVideo" (takePhoto)="captureImage($event)"></video-capture><br/>
        <label class="choose-file__btn" for="file"> בחר קובץ
            <!--<input (change)="updateImageFromFile($event)" type="file" id="file" accept="image/*">-->
            <button (click)="activateCamera()" >הפעל מצלמה</button>
        </label>
        <label class="choose-file__btn" for="file"> צלם
            <input (change)="updateImageFromFile($event)" type="file" id="file" accept="image/*" capture="camera">
        </label>
    `,
    styleUrls: ['./foot-image.component.scss']
})

export class FootImageComponent implements OnInit, AfterViewInit {
    @ViewChild('canvas') canvas: ElementRef;
    canvasContext;
    killVideo = true;
    cameraOn: boolean = false;
    canvasParams = {
        right: 280,
        left: 20,
        image: undefined,
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
            setTimeout(this.updateCanvasElements.bind(this), 0); //wait for resize to finish
        }.bind(this));
        
    }
    
    ngOnInit() {
        this.videoService.change.subscribe(function(event){
            this.updateImageFromVideo(event);
            this.killVideo = true;
        }.bind(this));
        // this.videoService.change.subscribe(.bind(this));
        this.videoService.cameraOn.subscribe(function(){this.killVideo = false}.bind(this));
    }
    
    activateCamera() {
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
        if (this.canvasParams.image) {
            this.canvasContext.drawImage(this.canvasParams.image, 0, 0, this.canvasParams.canvasWidth, this.canvasParams.canvasHight);
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
        console.log(videoElement);
        this.canvasParams.image = videoElement;
        this.cameraOn = false;
        this.updateCanvasElements();
    }
    
    updateImageFromFile(event) {
        var img = new Image();
        img.onload = this.drew.bind(this, img);
        img.onerror = this.failed;
        img.src = URL.createObjectURL(event.target.files[0]);
        this.canvasParams.image = img;
    }
    
    drew() {
        this.updateCanvasElements();
    }
    
    failed() {
        console.log('dammmmm!');
    }
}
