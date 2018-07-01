//INITIALIZATION:
//This class is responsible for the bottom bar UI.
class Screen {
	//INITIALIZATION: the constructor
	constructor() {
		//The size of the bottom box.
		this.boxHeight = 125;

		//Create the health bar
		this.healthBar = new Image();
		this.healthBar.src = "icons/health_bar_1.png";

		//Position the health bar
		this.healthBarMarginX = gameProperties.SCREEN_HEIGHT / 2 - 100;
		this.healthBarMarginY = 10;

		//Position the P and K buttons.
		this.kButtonMarginX = gameProperties.SCREEN_HEIGHT / 2 + 200;
		this.kButtonMarginY = gameProperties.SCREEN_HEIGHT - 35;
		this.pButtonMarginX = gameProperties.SCREEN_HEIGHT / 2 + 230;
		this.pButtonMarginY = gameProperties.SCREEN_HEIGHT - 60;
	}

	//OUTPUT: Change the health bar's image to fit the amount of health we have.
	updateHealthBar() {
		switch (player.health) {
			case 0: 
				this.healthBar.src = "icons/health_bar_0.png";
				break;
			case 1:
				this.healthBar.src = "icons/health_bar_1.png";
				break;
			case 2:
				this.healthBar.src = "icons/health_bar_2.png";
				break;
			case 3:
				this.healthBar.src = "icons/health_bar_3.png";
				break;
			case 4:
				this.healthBar.src = "icons/health_bar_4.png";
				break;
			case 5:
				this.healthBar.src = "icons/health_bar_5.png";
				break;
		}
	}

	//OUTPUT: Draw the UI.
	draw(context) {

		var boxPosX = -camera.camX;
		var boxPosY = gameProperties.SCREEN_HEIGHT
					- this.boxHeight
					- camera.camY;


		//Draw the black box.
		context.fillStyle = "black";
		context.fillRect(
			boxPosX, //The x coordinate
			boxPosY, //The y coordinate.
			gameProperties.SCREEN_WIDTH, //The width
			this.boxHeight //The height
		);

		//Draw the grey outline.
		context.strokeStyle = "#222222";
		context.lineWidth = 4;
		context.strokeRect(
			boxPosX, //The x coordinate
			boxPosY, //The y coordinate.
			gameProperties.SCREEN_WIDTH, //The width
			this.boxHeight //The height
		);

		var healthBarPosX = -camera.camX
							 + this.healthBarMarginX;

		var healthBarPosY = gameProperties.SCREEN_HEIGHT
							 - this.boxHeight
							 - camera.camY
							 + this.healthBarMarginY;

		//Draw the health bar.
		context.drawImage(
			this.healthBar,
			healthBarPosX,
			healthBarPosY,
			204, //The width 
			32 //The height
		);

		//Draw the buttons
		context.fillStyle = "indigo";
		context.font = "32px PressStart2P";
		context.fillText("K", -camera.camX + this.kButtonMarginX, -camera.camY + this.kButtonMarginY);
		context.fillText("P", -camera.camX + this.pButtonMarginX, -camera.camY + this.pButtonMarginY);
	}
}
