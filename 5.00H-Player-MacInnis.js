//INITIALIZATION:
//Our player class.
class Player {
	constructor() {
		//The x,y position of the player.
		this.x = 200;
		this.y = 200;

		//The width and height of the player
		this.width = 64;
		this.height = 96;

		//The player's health
		this.health = 5;

		//Create the collision box
		this.collider = new CollisionBox(
			this.x,this.y, 16, this.height / 2 - 1, this.width / 2,this.height / 2 - 1
		);		
		
		//Add to the list of colliders.
		colliders.push(this);

		//The speed of the player
		this.speed = 1.5;
		
		//The images for the player's sprite and shadow
		this.sprite = new Image();
		this.shadow = new Image();
		
		//The sprite offset for the player, if necessary. 
		this.spriteOffsetX = 0;
		this.spriteOffsetY = 0;

		//Animation properties
		this.currentFrame = 0;
		this.isAnimating = true;

		//Animation metadata.
		var walkAnimation = {
			frames: 3,
			padding: 32,
			width: 64,
			height: 96,
			fps: 5,
		}

		//Load the animation atlas for the player
		this.sprite.src = "tiles/player/overworld/east_walk.png";
		this.shadow.src = "tiles/player/shadows/east_walk.png";

		//Animate the player every frame.
		var self = this;
		setInterval(function() {
			self.animate(walkAnimation);
		}, 1000 / walkAnimation.fps );
	}

	//OUTPUT: Animate the player
	animate(animation) {
		if (this.isAnimating) {
			this.currentFrame ++;
			if (this.currentFrame >= animation.frames)
				this.currentFrame = 0;
		}	
		
		this.spriteOffsetX = this.currentFrame * (animation.width + animation.padding) ;
	}

	//OUTPUT: Animate the player.
	animateMovement() {
		if (Input.x > 0) {
			if (worldSwitcher.currentWorld == "overworld")
				this.sprite.src = "tiles/player/overworld/east_walk.png";
			else
				this.sprite.src = "tiles/player/underworld/east_walk.png";

			this.shadow.src = "tiles/player/shadows/east_walk.png";
		}
		else if (Input.x < 0) {
			if (worldSwitcher.currentWorld == "overworld")
				this.sprite.src = "tiles/player/overworld/west_walk.png";
			else
				this.sprite.src = "tiles/player/underworld/west_walk.png";

			this.shadow.src = "tiles/player/shadows/west_walk.png";
		}
		if (Input.y > 0) {
			if (worldSwitcher.currentWorld == "overworld")
				this.sprite.src = "tiles/player/overworld/south_walk.png";
			else
				this.sprite.src = "tiles/player/underworld/south_walk.png";
			this.shadow.src = "tiles/player/shadows/south_walk.png";
		}
		else if (Input.y < 0) {
			if (worldSwitcher.currentWorld == "overworld")
				this.sprite.src = "tiles/player/overworld/north_walk.png";
			else
				this.sprite.src = "tiles/player/underworld/north_walk.png";
			this.shadow.src = "tiles/player/shadows/north_walk.png";
		}
	}

	//OUTPUT: Move the player with keyboard input.
	move() {
		if (Input.x == 0 && Input.y == 0) {
			this.isAnimating = false;
			this.spriteOffsetX = 64 + 32;
		}	
		else {
			this.isAnimating = true;
		}

		this.animateMovement();
		var simulatedXPos = this.x + Input.x * this.speed;
		var simulatedYPos = this.y + Input.y * this.speed;
		
		this.collider.update(simulatedXPos, simulatedYPos);
	
		if (!this.collider.isColliding()) {
			this.x = simulatedXPos;
			this.y = simulatedYPos;
		}
	}

	//OUTPUT: Draw the player's shadow.
	drawShadow(context) {
		//Back up the canvas.
		context.save();
		//Apply a blur filter to the context
		context.filter = "blur(2px)";
		//Draw with transparency
		context.globalAlpha = gameProperties.shadowOpacity;
		//Move the context to compensate for angular rotations
		context.translate(this.x + this.width + 48, this.y - this.height * gameProperties.shadowScale / 2 + 77);
		//Rotate the context to rotate the shadow
		context.rotate(gameProperties.shadowAngle * Math.PI / 180);
		//Draw the shadow
		context.drawImage(
			this.shadow, //the image
			this.spriteOffsetX, this.spriteOffsetY, //offsets
			64, 96, //size of player sprite
			-this.width / 2, -this.height / 2, //x,y position
			this.width - 5, this.height * gameProperties.shadowScale - 5); //the width and height.
		//Roll back the context.
		context.restore();
	}

	//OUTPUT: Draw the player's sprite.
	draw(context) {
		//Draw the player
		context.drawImage(
			this.sprite, //the image
			this.spriteOffsetX, this.spriteOffsetY, //offsets
			64, 96, //size of player sprite
			this.x, this.y, //x,y position
			this.width, this.height ); //the width and height
	}
}
