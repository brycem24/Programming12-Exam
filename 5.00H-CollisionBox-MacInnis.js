class CollisionBox {
	//INITIALIZATION: The constructor
	constructor(x,y,offsetX,offsetY,width,height) {
		//Arguments (x,y): the x,y position of the collision box.
		this.x = x
		this.y = y;

		//Arguments (offsetX, offsetY): the offset of the collision box.
		this.offsetX = offsetX;
		this.offsetY = offsetY;

		//Arguments (width, height): the width and height of the collision box.
		this.width = width;
		this.height = height;

		//Make a bounding box.
		this.update(x,y);
	}

	//PROCESSING: Given an x,y position make a bounding box.
	update(x,y) {
		this.x = x;
		this.y = y;

		//Make the top boundary
		this.topBoundary = {
			x: this.x + this.width / 2 + this.offsetX,
			y: this.y + this.offsetY,
		}

		//Make the bottom boundary
		this.bottomBoundary = {
			x: this.x + this.width / 2 + this.offsetX,
			y: this.y + this.height + this.offsetY,
		}
		
		//Make the left boundary
		this.leftBoundary = {
			x: this.x + this.offsetX,
			y: this.y + this.height / 2 + this.offsetY,
		}

		//Make the right boundary
		this.rightBoundary = {
			x: this.x + this.width + this.offsetX,
			y: this.y + this.height / 2 + this.offsetY,
		}
	}

	//PROCESSING: Check for collisions
	isColliding() {
		//Loop through all the colliders and check for collisions
		for (var i = 0; i < colliders.length; i++)
		{
			var collider = colliders[i].collider;
	
			//Is there a horizontal collision?
			var hasHorizontalOverlap = false;

			//Check for horizontal collisions
			if (this.leftBoundary.x <= collider.rightBoundary.x &&
				this.leftBoundary.x >= collider.leftBoundary.x)
				hasHorizontalOverlap = true;
			else if (this.rightBoundary.x >= collider.leftBoundary.x &&
				this.rightBoundary.x <= collider.rightBoundary.x)
				hasHorizontalOverlap =  true;
			else
				hasHorizontalOverlap = false;

			//Is there a vertical collision?
			var hasVerticalOverlap = false;

			//Check for vertical collisions
			if (this.bottomBoundary.y > collider.topBoundary.y &&
				this.bottomBoundary.y < collider.bottomBoundary.y)
				hasVerticalOverlap = true;
			else if (this.topBoundary.y < collider.bottomBoundary.y &&
				this.topBoundary.y > collider.topBoundary.y)
				hasVerticalOverlap = true;
			else
				hasVerticalOverlap = false;

			//The player only collides if there is horizontal and vertical overlap.
			if (hasHorizontalOverlap && hasVerticalOverlap)
				return true;
		}

		//No collisions.
		return false;
	}


	//OUTPUT: Show debug information about the colliders
	debug() {
		var context = gameProperties.context;
		context.fillStyle = "red";

		//Red outline
		context.strokeRect(this.x + this.offsetX, this.y + this.offsetY, this.width, this.height);	

		//A dot on each boundary.
		context.fillRect(this.topBoundary.x - 4, this.topBoundary.y - 4, 8, 8);
		context.fillRect(this.bottomBoundary.x - 4, this.bottomBoundary.y - 4, 8, 8);
		context.fillRect(this.leftBoundary.x - 4, this.leftBoundary.y - 4, 8, 8);
		context.fillRect(this.rightBoundary.x - 4, this.rightBoundary.y - 4, 8, 8);
	}
}
