//INITIALIZATION:
//This class draws an individual sprite from a spritesheet.
class Texture
{
	//INITIALIZATION: the constructor
	constructor(atlasX, atlasY) {

		//ARGUMENTS (atlasX, atlasY):
		//The coordinates of the desired sprite on the spritesheet image.
		this.atlasX = atlasX;
		this.atlasY = atlasY;

		//ARGUMENT (image): create the texture atlas
		this.image = new Image();

		//Load the texture atlas' source file.
		this.image.src = "tiles/overworld_tileset.png";

		//How far the first sprite is inset.
		this.offset = 12;

		//The space between the sprites.
		this.spacing = 2;

		//Gets the start position of the individual sprite
		this.atlasOffsetX = atlasX * (64 + this.spacing) + this.offset;
		this.atlasOffsetY = atlasY * (64 + this.spacing) + this.offset;
	}

	//OUTPUT: Draw the specific region of the texture atlas.
	draw(context, x,y) {
		context.drawImage(this.image, this.atlasOffsetX, this.atlasOffsetY, 64, 64, x, y, 48, 48);
	}
}

