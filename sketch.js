// Getting video from camera then proccess it to put it on canvas

var video;
var vidScale = 4;


function setup() {
	createCanvas(640, 480);
	// background(255);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(width / vidScale, height / vidScale);
	// video.hide();
	ellipseMode(CENTER);
}

function draw() {
	background(0);

	video.loadPixels();
	loadPixels();

	for (var y = 0; y < video.height; y++) {
		for (var x = 0; x < video.width; x++) {

			var index = ((video.width - x + 1) + y * video.width) * 4;

			var r = video.pixels[index + 0];
			var g = video.pixels[index + 1];
			var b = video.pixels[index + 2];
			var bright = (r + g + b) / 3;

			fill(bright);
			noStroke();
			var rad = map(bright, 0, 255, 0, vidScale);
			ellipse(x * vidScale, y * vidScale, rad);

		}
	}


}