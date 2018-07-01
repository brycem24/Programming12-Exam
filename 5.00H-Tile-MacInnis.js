/*INITIALIZATION: 
* A class that holds the data for each tile drawn in the map. */
class Tile {
	//INITIALIZATION: The constructor
	constructor (x,y, tileX, tileY,width,height,texture, isCollider) {

		//ARGUMENTS (tileX, tileY): the tile position of the tile.
		this.tileX = tileX;
		this.tileY = tileY;

		//ARGUMENTS (x,y): the screen position of the tile.
		this.x = x;
		this.y = y;

		//ARGUMENTS (width, height): the width and height we draw our tile to.
		this.width = width;
		this.height = height;

		//ARGUMENT (texture): the image loaded.
		this.texture = texture;
	
		//ARGUMENT (isCollider): can the player walk over this tile?
		this.isCollider = isCollider;
		
		//A tag. This is included so you can check what you collided with.
		this.tag = "Tile";

		//Create a collision box only if it's necessary.
		if (this.isCollider) {

			this.collider = new CollisionBox(
				this.x,this.y, //The coordinates of the collision box.
				0,0, //Offset the collider box by x,y
				this.width,this.height //The dimensions
			);

			//Update the new collision box
			this.collider.update(this.x, this.y);
			
			//Save it to a list of colliders to check for collisions with.
			colliders.push(this);
		}	
	}

	//OUTPUT: Draw the tile.
	draw(context) {
		this.texture.draw(context, this.x, this.y);
	}
}
