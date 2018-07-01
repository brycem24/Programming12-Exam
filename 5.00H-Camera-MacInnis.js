//INITIALIZATION:
//This class is responsible for the camera.
//Without this, the screen would not follow the player.
class Camera
{
	update(context) {
		context.setTransform(1,0,0,1,0,0);//reset the transform matrix 
   		context.clearRect(0, 0, gameProperties.SCREEN_WIDTH, gameProperties.SCREEN_HEIGHT);//clear the viewport AFTER the matrix is reset

		//Clamp the camera position to the world bounds while centering the camera around the player
		this.camX = this.clamp(
			-player.x + gameProperties.SCREEN_WIDTH / 2, //value
			map.MIN_X, //minimum value
			map.MAX_X - gameProperties.SCREEN_WIDTH //maximum value
		);

		this.camY = this.clamp(
			-player.y + gameProperties.SCREEN_HEIGHT / 2, //value
			map.MIN_Y, //minimum value
			map.MAX_Y - gameProperties.SCREEN_HEIGHT); //maximum value

		//Move the context to follow the player
		context.translate( this.camX, this.camY );
	}

	//Keep a value between a max and a min.
	clamp(value, min, max){
    	if (value < min)
			return min;
    	else if (value > max)
			return max;
    	return value;
	}
}
