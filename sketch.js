// Getting video from camera then proccess it to put it on canvas

var video, canvas;
var vidScale = 16;
var b_w = true;


function setup() {
	canvas = createCanvas(windowWidth, windowHeight - 20);
	background(0);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(width / vidScale, height / vidScale);
	video.hide();
	ellipseMode(CENTER);

	//capture button
	var btn = createButton('Capture');
	btn.position(windowWidth / 2 - 15, windowHeight - 35);
	btn.mouseClicked(function () {
		save();
	});

	//slider for vidScale
	var scaleSlider = createSlider(8, 32, 16, 8);
	scaleSlider.position(windowWidth / 2 - 250, windowHeight - 35);
	scaleSlider.changed(function () {
		vidScale = this.value();
		video = createCapture(VIDEO);
		video.size(width / vidScale, height / vidScale);
		video.hide();
	})

	//create checkbox for color
	var checkcolor = createCheckbox('Color');
	checkcolor.position(windowWidth / 2 + 200, windowHeight - 35);
	checkcolor.style('color', '#fff');
	checkcolor.changed(function () {
		b_w = !b_w;
	})

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

			if (b_w) {
				fill(bright);
			} else {
				fill(r, g, b);
			}
			noStroke();
			var rad = map(bright, 0, 255, 0, vidScale);
			ellipse(x * vidScale, y * vidScale, rad);

		}
	}


}