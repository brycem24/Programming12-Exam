//INITIALIZATION:
//This class is responsible for the UI displaying player stats.
class Statistics {

	//INITIALIZATION: The constructor
	constructor() {
		this.title = "yOuR sTaTs";
	}

	//OUTPUT: Display the screen
	show(context) {
		//The screen is open
		gameProperties.statisticsIsOpen = true;
		//Pause the game to prevent the screen from refreshing
		gameProperties.isPaused = true;
		//Clear the context
		context.clearRect(map.MIN_X, map.MIN_Y, map.MAX_X, map.MAX_Y);
		//Fill the context with a black background
		context.fillStyle = "black";
		context.fillRect(-camera.camX, -camera.camY, gameProperties.SCREEN_WIDTH, gameProperties.SCREEN_HEIGHT);
		context.fillStyle = "white";

		//Output the statistics using fillText
		context.font = "24px PressStart2P";
		context.fillText(this.title, -camera.camX + gameProperties.SCREEN_WIDTH / 2 - 120, -camera.camY + 100 )
		context.fillText( player.health + "/5 hp", -camera.camX + gameProperties.SCREEN_WIDTH / 2 - 200, -camera.camY + 200 )
	}

	//OUTPUT: Hide the screen
	hide(context) {
		//Unpause the game
		gameProperties.isPaused = false;
		//The screen is no longer open.
		gameProperties.statisticsIsOpen = false;
		//Now the screen will automatically refresh with the game.
	}
}
