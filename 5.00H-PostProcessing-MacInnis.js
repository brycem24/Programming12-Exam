//INITIALIZATION:
//This class is responsible for post-processing (the polish)
class PostProcessing {
	//INITIALIZATION: The constructor
	constructor() {
		//Create the vignette image
		this.vignette = new Image();
		this.vignette.src = "postprocessing/vignette.png";
	}

	//OUTPUT: Draw a vignette around the screen
	applyVignette(context) {
		context.drawImage(
			this.vignette, //The image
			-camera.camX,-camera.camY, //The x,y position
			gameProperties.SCREEN_WIDTH, //Width
			gameProperties.SCREEN_HEIGHT //Height
		);
	}
}
