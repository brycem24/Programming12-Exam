//INITIALIZATION:
//A class that controls the day and night cycle.
class DayAndNightCycle {
	tick(context) {
		//Each frame add 16.67 ms (the length of each frame).
		this.currentTimeInMilliseconds += 16.67;

		//Clamp the game time to the length of the day/night cycle.
		if (this.currentTimeInMilliseconds > this.lengthInMilliseconds)
			this.currentTimeInMilliseconds = 0;

		//Create a sine wave that oscillates over game time.
		var moonlightAlpha = Math.sin(
								this.currentTimeInMilliseconds
								/ this.lengthInMilliseconds
								* Math.PI)
							* this.intensity;
		
		//Create an inverse sine wave of the one above.
		var sunlightAlpha = -Math.sin(
								this.currentTimeInMilliseconds
								/ this.lengthInMilliseconds
								* Math.PI) 
							* this.intensity;
		
		//Transform the waves such that they are seamless.
		if (moonlightAlpha < 0)
			moonlightAlpha = this.intensity + moonlightAlpha;

		if (sunlightAlpha < 0)
			sunlightAlpha = this.intensity + sunlightAlpha;
	
		//Draw a blue overlay and lerp the alpha value by our sine wave.
		context.globalAlpha = moonlightAlpha; 
		context.fillStyle = "blue";
		
		context.fillRect(
			-camera.camX,
			-camera.camY,
			gameProperties.SCREEN_WIDTH,
			gameProperties.SCREEN_HEIGHT
		);
		
		//Draw a orange overlay and lerp the alpha value by our negative sine wave.
		context.globalAlpha = sunlightAlpha;
		context.fillStyle = "orange";

		context.fillRect(-camera.camX,
						 -camera.camY,
						 gameProperties.SCREEN_WIDTH,
						 gameProperties.SCREEN_HEIGHT
		);
		
		//Restore the alpha back to normal
		context.globalAlpha = 1.0;
	}
	
	//INITIALIZATION: the constructor
	constructor() {

		//The desired length of the day/night cycle
		this.minutesLong = 1;

		//Convert the desired length into milliseconds
		//Multiply by Pi to convert it to a period for the sine wave
		this.lengthInMilliseconds = this.minutesLong * 60 * 1000 * 3.1415;

		//The current time in the cycle.
		this.currentTimeInMilliseconds = 0;

		//Intensity of the overlays
		this.intensity = 0.2;
	}
}
