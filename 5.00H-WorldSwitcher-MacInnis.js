//INITIALIZATION:
//This class is responsible for switching between dimensions.
class WorldSwitcher {
	//INITIALIZATION: The constructor
	constructor() {
		this.currentWorld = "overworld";
	}

	//OUTPUT: Switch to the overworld dimension.
	switchToOverworld() {
		this.currentWorld = "overworld";
		
		//Make the shadows lighter.
		gameProperties.shadowOpacity = 0.15;

		//Play new music
		music.src = "music/overworld.mp3";
		music.volume = 0.5;
		music.play();
		music.loop = true;

		//This is a bit of a hack, it updates the player's sprite to the new dimension.
		Input.y = 1;
		player.move()
		Input.y = 0;

		//Change all of the tiles' tile set to the overworld asset.
		for (var i = 0; i < map.tiles.length; i++)
			map.tiles[i].texture.image.src = "tiles/overworld_tileset.png";
	}

	//OUTPUT: Switch to the underworld dimension.
	switchToUnderworld() {
		this.currentWorld = "underworld";

		//Make the shadows darker.
		gameProperties.shadowOpacity = 1.0;

		//Play new music
		music.src = "music/underworld.mp3";
		music.volume = 0.02; //yes it's really that loud.
		music.play();
		music.loop = true;

		//The 'hack' again, update the sprite to the new dimension.
		Input.y = 1;
		player.move();
		Input.y = 0;
		
		//Change all of the tiles' tile set to the underworld asset.
		for (var i = 0; i < map.tiles.length; i++)
			map.tiles[i].texture.image.src = "tiles/underworld_tileset.png";
	}


	//PROCESSING: Switch the world from the current.
	switchWorlds() {

		//Don't switch the world if the game is paused.
		if (!gameProperties.isPaused) {

			//Pause the game, while we switch worlds.
			gameProperties.isPaused = true;

			//Fill the screen with a black background.
			gameProperties.context.fillStyle = "black";
			gameProperties.context.beginPath();
			gameProperties.context.fillRect(-camera.camX,-camera.camY, gameProperties.SCREEN_WIDTH, gameProperties.SCREEN_HEIGHT);
			gameProperties.context.closePath();

			//Play dialogue specific to the current world.
			if (this.currentWorld == "overworld")
				dialogue.print(4);
			else
				dialogue.print(5);


			//Switch after a small delay (long enough for a dialogue promt)
			var self = this;
			setTimeout(function() {

				//Switch to the appropriate world
				if (self.currentWorld == "overworld") 
					self.switchToUnderworld();
				else if (self.currentWorld == "underworld")
					self.switchToOverworld();

				//Unpause the game
				gameProperties.isPaused = false;
			}, 4000);

		}
	}

	//PROCESSING: Change the worlds.
	setWorld(world) {
		//Switch to the world given
		if (world == "overworld")
			this.switchToOverworld();
		else if (world == "underworld")
			this.switchToUnderworld();
	}

}
