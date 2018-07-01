//Abstract singleton class for storing input on a cartesian plane.
class Input {
    //PROCESSING: When an input key is pressed, save the input.
    static bindKey(keyEvent) {
        var keyNumber = keyEvent.which || keyEvent.keyCode;

        //UP movement
        if (keyNumber == 87 || keyNumber == 38)
            Input.y = -1;
        //DOWN movement
        else if (keyNumber == 83 || keyNumber == 40)
            Input.y = 1;
        else if (keyNumber == 65 || keyNumber == 37)
            Input.x = -1;
        //RIGHT movement
        else if (keyNumber == 68 || keyNumber == 39)
            Input.x = 1;
		//SPACE BAR pushed
		else if (keyNumber == 32) {
			worldSwitcher.switchWorlds();
		}
		//K is pushed
		else if (keyNumber == 75) {
			Input.triggered = true;
		}
		//P is pushed
		else if (keyNumber == 80) {
			if (!gameProperties.statisticsIsOpen && !gameProperties.gameOver)
				statistics.show(gameProperties.context);
			else
				statistics.hide(gameProperties.context);
		}
        //NO movement
        else {
            Input.x = 0;
            Input.y = 0;
        }
    }

    //PROCESSING: When an input key is released, reset the input.
    static releaseKey(keyEvent) {
        var keyNumber = keyEvent.which || keyEvent.keyCode;

        //UP movement
        if (keyNumber == 87 || keyNumber == 38)
            Input.y = 0;
        //DOWN movement
        else if (keyNumber == 83 || keyNumber == 40)
            Input.y = 0;
        //LEFT movement
        if (keyNumber == 65 || keyNumber == 37)
            Input.x = 0;
        //RIGHT movement
        else if (keyNumber == 68 || keyNumber == 39)
            Input.x = 0;
		//Remove any binding to the enter/space key on firefox.
		else if (keyNumber == 32 || keyNumber == 13)
			return;
		//K is released
		else if (keyNumber == 75) {
			Input.triggered = false;
		}
    }
}

//INITIALIZATION: Defines x,y input.
Input.x = 0;
Input.y = 0;
Input.triggered = false;
