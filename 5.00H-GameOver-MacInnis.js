//INITIALIZATION:
//This class is responsible for displaying the game over screen.
class GameOver 
{
	//INITIALIZATION: The constructor
	constructor() {
		this.title = "Game Over!";
	}

	//OUTPUT: Show the Game Over screen
	show(context) {
		//Pause the game.
		gameProperties.isPaused = true;
		//Shut the game down.
		gameProperties.gameOver = true;
		//Clear the context
		context.clearRect(map.MIN_X, map.MIN_Y, map.MAX_X, map.MAX_Y);
		//Fill the context wih a black screen.
		context.fillStyle = "black";
		context.fillRect(
			-camera.camX, -camera.camY, //X,Y Position
			gameProperties.SCREEN_WIDTH, //WIDTH
			gameProperties.SCREEN_HEIGHT //HEIGHT
		); 

		//Display the Game Over text.
		context.font = "48px PressStart2P";
		context.fillStyle = "white";
		
		context.fillText(this.title,
			-camera.camX + 64,
			-camera.camY + gameProperties.SCREEN_HEIGHT / 2 - 100
		);
	}
}
