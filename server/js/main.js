var canvas = document.getElementById('can');
var c = canvas.getContext('2d');
c.fillStyle = "#FFFFFF";
c.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < 10; i++) {
	c.beginPath();
	c.moveTo((i * 30), 0);
	c.lineTo((i * 30), 300);
	c.strokeStyle = 'rgba(0,0,0,.1)';
	c.stroke();
	
	c.beginPath();
	c.moveTo(0, (i * 30));
	c.lineTo(300, (i * 30));
	c.strokeStyle = 'rgba(0,0,0,.1)';
	c.stroke();
}
c.strokeStyle = '#f00';
c.fillStyle = 'rgba(0,256,0,.5)';

// c.beginPath();
// c.moveTo(60, 60);
// c.lineTo(61, 61);
// c.stroke();

// c.beginPath();
// c.arc(60, 60, 30, 0.5 * Math.PI, 1 * Math.PI, true);
// c.arc(x,y,radius,startAngel,endAngle,anticlockwise);
// c.stroke();
// c.fill();
var firstClick = true;
var points = {
	x: {s: 0, e: 0},
	y: {s: 0, e: 0}
};
canvas.addEventListener('click', function (click) {
	if (firstClick) {
		c.beginPath();
		c.moveTo(click.layerX, click.layerY);
		points.x.s = click.layerX;
		points.y.s = click.layerY;
		firstClick = false;
	} else {
		c.lineTo(click.layerX, click.layerY);
		points.x.e = click.layerX;
		points.y.e = click.layerY;
		c.stroke();
		var arc = {
			start: {
				x: points.x.s + (points.x.e - points.x.s) * 0.50,
				y: points.y.s + (points.y.e - points.y.s) * 0.50
			},
			end: {
				x: points.x.e,
				y: points.y.e
			},
			radius: lineDistance({x: points.x.s, y: points.y.s}, {x: points.x.e, y: points.y.e}) / 2,
			angle: function () {
				var angle = calcAngle(this.start.x, this.start.y, this.end.x, this.end.y);
				if (angle > 180) {
					this.angleEnd = (angle - 180) / 360 * 2 * Math.PI;
				} else {
					this.angleEnd = (angle + 180) / 360 * 2 * Math.PI;
				}
				this.angleStart = angle / 360 * 2 * Math.PI;
			},
			angleStart: 0,
			angleEnd: 0,
			clockWise: true
		};
		console.log(points);
		console.log(arc);
		console.log(arc.angle());
		arc.angle();
		c.arc(arc.start.x,
			arc.start.y,
			arc.radius,
			arc.angleStart,
			arc.angleEnd,
			arc.clockWise);
		c.fill();
		points = {
			x: {s: 0, e: 0},
			y: {s: 0, e: 0}
		};
		firstClick = true;
	}
});

function calcAngle(cx, cy, ex, ey) {
	var dy = ey - cy;
	var dx = ex - cx;
	var theta = Math.atan2(dy, dx); // range (-PI, PI]
	theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
	if (theta < 0) theta = 360 + theta; // range [0, 360)
	return theta;
}

function lineDistance(point1, point2) {
	var xs = 0;
	var ys = 0;
	
	xs = point2.x - point1.x;
	xs = xs * xs;
	
	ys = point2.y - point1.y;
	ys = ys * ys;
	return Math.sqrt(xs + ys);
}

document.getElementById('file').onchange = function (e) {
	var img = new Image();
	img.onload = draw;
	img.onerror = failed;
	img.src = URL.createObjectURL(this.files[0]);
};

function draw() {
	console.log(this);
	c.drawImage(this, 0, 0);
}

function failed() {
	console.error("The provided file couldn't be loaded as an Image media");
}

function copyCanvas() {
	var base64Canvas = canvas.toDataURL('image/jpeg', 1);
	var img = document.getElementById('imageMe');
	img.src = base64Canvas;
}
