import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

@Component({
    selector: 'foot-image',
    template: `
<canvas #canvas (click)="updateLine($event)"></canvas><br/>
<label class="choose-file__btn" for="file"> בחר קובץ
<input (change)="updateImage($event)" type="file" id="file" accept="image/*">
</label>
<label class="choose-file__btn" for="file"> צלם
<input (change)="updateImage($event)" type="file" id="file" accept="image/*" capture="camera">
</label>
`,
    styleUrls: ['./foot-image.component.scss']
})

export class FootImageComponent implements OnInit{
    @ViewChild('canvas') canvas:ElementRef;
    canvasContext;
    canvasParams = {
        right: 280,
        left: 20,
        image:undefined
    };
    ngOnInit(){
        this.canvasContext = this.canvas.nativeElement.getContext('2d');
        this.updateCanvas();
    }
    
    updateLine(event){
        event.preventDefault();
        this.canvasContext.clearRect(0, 0, 300, 300);
        if(event.offsetX > 150){
            this.canvasParams.right = event.offsetX;
        } else {
            this.canvasParams.left = event.offsetX;
        }
        
        this.updateCanvas();
    }
    
    updateCanvas(){
        //image
        if(this.canvasParams.image){
            this.canvasContext.drawImage(this.canvasParams.image,0,0);
        }
        
        //right
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.setLineDash([5,3]);
        this.canvasContext.moveTo(this.canvasParams.right,0);
        this.canvasContext.lineTo(this.canvasParams.right,300);
        this.canvasContext.stroke();
        
        //left
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.setLineDash([5,3]);
        this.canvasContext.moveTo(this.canvasParams.left,0);
        this.canvasContext.lineTo(this.canvasParams.left,300);
        this.canvasContext.stroke();
    }
    
    updateImage(event){
        var img = new Image();
        img.onload = this.drew.bind(this, img);
        img.onerror = this.failed;
        img.src = URL.createObjectURL(event.target.files[0]);
        this.canvasParams.image = img;
    }
    drew(){
        this.updateCanvas();
    }
    failed(){
        console.log('thammmmm!');
    }
}
