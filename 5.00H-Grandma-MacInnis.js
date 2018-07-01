//INITIALIZATION
//The class that handles Grandma's AI.
class Grandma 
{
	//INITIALIZATION: The constructor
	constructor(x,y) {

		//Her x,y position
		this.x = x;
		this.y = y;

		//The width and height of her sprite
		this.width = 64;
		this.height = 96;

		//The speed she moves at
		this.speed = 1.5;

		//Create two sprites, one for her and one for her shadow.
		this.sprite = new Image();
		this.shadow = new Image();

		//Add a tag so you know who collided with whom.
		this.tag = "Grandma";
		
		//An offset for the sprite if necessary.
		this.spriteOffsetX = 0;
		this.spriteOffsetY = 0;

		//Create a collision box for Grandma
		this.collider = new CollisionBox(
			this.x, this.y, //X,Y POSITION
			this.width / 4, this.height / 2, //OFFSETS
			this.width / 2, this.height / 2 //WIDTH and HEIGHT
		);
		
		//Add to the list of colliders
		colliders.push(this);
		
		//Animation variables
		this.currentFrame = 0;
		this.isAnimating = true;

		//Metadata about Grandma's walk animation
		var walkAnimation = {
			frames: 3,
			padding: 32,
			width: 64,
			height: 96,
			fps: 3,
		}

		//Load the animation sheets for each sprite
		this.sprite.src = "tiles/grandma/overworld/east_walk.png";
		this.shadow.src = "tiles/grandma/shadows/east_walk.png";
	
		//Animate Grandma
		var self = this;
		setInterval(function() {
			self.animate(walkAnimation);
		}, 1000 / walkAnimation.fps );

		this.spawn();
	}

	//Change the frame of Grandma's animation.
	animate(animation) {
		if (this.isAnimating) {
			this.currentFrame ++;
			if (this.currentFrame >= animation.frames)
				this.currentFrame = 0;
		}
		
		this.spriteOffsetX = this.currentFrame * (animation.width + animation.padding) ;
	}

	//Change the sprites according to the direction Grandma is facing
	changeDirectionUnderworld(direction) {
		switch (direction) {
			case "north":
				this.sprite.src = "tiles/grandma/underworld/north_walk.png";
				break;
			case "south":
				this.sprite.src = "tiles/grandma/underworld/south_walk.png";
				break;
			case "east":
				this.sprite.src = "tiles/grandma/underworld/east_walk.png";
				break;
			case "west":
				this.sprite.src = "tiles/grandma/underworld/west_walk.png";
				break;
			default:
				break;
		}
	}

	//Change the sprites according to the direction Grandma is facing
	changeDirectionOverworld(direction) {
		switch(direction) {
			case "north":
				this.sprite.src = "tiles/grandma/overworld/north_walk.png";
				break;
			case "south":
				this.sprite.src = "tiles/grandma/overworld/south_walk.png";
				break;
			case "east":
				this.sprite.src = "tiles/grandma/overworld/east_walk.png";
				break;
			case "west":
				this.sprite.src = "tiles/grandma/overworld/west_walk.png";
				break;
			default:
				break;
		}
	}


	//Change the sprites according to the direction Grandma is facing
	changeDirections(direction) {
		if (worldSwitcher.currentWorld == "overworld") 
			this.changeDirectionOverworld(direction);
		else
			this.changeDirectionUnderworld(direction);
	}

	move() {
		//The deltaX and deltaY values
		var distToPlayerX = player.x - this.x;
		var distToPlayerY = player.y - this.y;
		
		//Calculate distance using the euclidean distance formula.
		var distToPlayer = Math.floor(
			Math.sqrt(
				distToPlayerX * distToPlayerX +
				distToPlayerY * distToPlayerY
			)
		)

		//If the player is in range, attack!
		if (distToPlayer < 300 && distToPlayer > 20) {
	
			//Calculate the hypotenuse between the player and Grandma.
			var deltaX = player.x - this.x;
			var deltaY = player.y - this.y;
			var targetHypotenuse = Math.atan2(deltaY, deltaX);

			//Distance to travel horizontally.
			var simulatedPosX = Math.cos(targetHypotenuse);
			
			//Distance to travel vertically.
			var simulatedPosY = Math.sin(targetHypotenuse);

			
			//Change the sprite when you turn.
			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				if (deltaX > 0)
					this.changeDirections("east");
				else
					this.changeDirections("west");
			}

			else	{
				if (deltaY > 0)
					this.changeDirections("south");
				else
					this.changeDirections("north");
			}

			//Chase the player!
			if (worldSwitcher.currentWorld == "underworld") {
				this.x += simulatedPosX * this.speed;
				this.y += simulatedPosY * this.speed;
			}
		}

		//If the gap is closed and in the underworld, grandma will KILL!
		if (distToPlayer < 25 && worldSwitcher.currentWorld == "underworld") {
			player.health--;
			this.spawn();
		}
		//If the gap is closed and in the overworld, grandma will ramble.
		else if (distToPlayer < 50 && worldSwitcher.currentWorld == "overworld"){
			if (Input.triggered)
				dialogue.print(1);
		}
	}

	//Set the position to one of the spawn points.
	spawn() {
		var spawnPointIndex = Math.floor(
			Math.random() 
			* map.spawnPoints.length
		 );

		var spawnPoint = map.spawnPoints[spawnPointIndex];
		this.x = spawnPoint.x;
		this.y = spawnPoint.y;
	}

	//OUTPUT: Draw grandma's shadow
	drawShadow(context) {
		//Back up the context
		context.save();
		
		//Apply a blur filter and draw with transparency
		context.filter = "blur(2px)";
		context.globalAlpha = gameProperties.shadowOpacity;

		//Translate the context to compensate for rotations.
		context.translate(
			this.x + this.width + 48,
			this.y - this.height * gameProperties.shadowScale / 2 + 77
		);

		//Rotate the canvas
		context.rotate(gameProperties.shadowAngle * Math.PI / 180);

		//Draw Grandma's shadow.
		context.drawImage(
			this.shadow,
			this.spriteOffsetX, this.spriteOffsetY,
			64, 96,
			-this.width / 2, -this.height / 2,
			this.width - 5, this.height * gameProperties.shadowScale - 5
		); 

		//Roll back the context
		context.restore();
	}


	//OUTPUT: Draw grandma's sprite
	draw(context) {
		context.drawImage(this.sprite,
			this.spriteOffsetX, this.spriteOffsetY,
			64, 96,
			this.x, this.y,
			this.width, this.height
		);

		//Update grandma's collision box.
		this.collider.update(this.x, this.y);
	}
}
