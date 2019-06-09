import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";

@Component({
    selector: 'video-capture',
    template: `
        <video (click)="captureImage()" autoplay="true" id="videoElement" #videoElement></video>
    `
})

export class VideosComponent implements OnInit{
    @ViewChild('videoElement') video:ElementRef;
    @Output() takePhoto =new EventEmitter();
    ngOnInit(){
        this.activeVideo();
    }
    
    activeVideo(){
        if (window.navigator.mediaDevices.getUserMedia) {
            var that = this;
            window.navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // var me = document.getElementById('videoElement');
                // me.srcObject = stream;
                that.video.nativeElement.srcObject = stream
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
                console.log(err0r);
            });
        }
    }
    
    captureImage(){
        this.takePhoto.emit(this.video)
    }
}
