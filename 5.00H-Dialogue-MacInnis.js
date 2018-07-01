class Dialogue {
	nextCharacter() {
		this.context.font = "16px PressStart2P";
		this.context.fillStyle = "black";
		this.context.fillRect(-camera.camX, gameProperties.SCREEN_HEIGHT - this.dialogueBoxHeight - camera.camY, gameProperties.SCREEN_WIDTH, this.dialogueBoxHeight);

		this.context.strokeStyle = "white";
		this.context.lineWidth = 4;
		this.context.strokeRect(-camera.camX, gameProperties.SCREEN_HEIGHT - this.dialogueBoxHeight - camera.camY, gameProperties.SCREEN_WIDTH, this.dialogueBoxHeight);
		this.context.lineWidth = 1;
		this.context.strokeStyle = "black";

		if (this.currentText != this.finalText)
		{
			var index = this.finalText.length - 
					    (this.finalText.length - this.currentText.length);
			
			this.currentText += this.finalText[index];

			var that = this;
			setTimeout(function() {
				that.nextCharacter(that.currentText);
			}, this.CHARACTER_DISPLAY_DELAY);
			
			this.context.fillStyle = "white";
			this.context.fillText(this.currentText, this.dialogueTextMargin - camera.camX, gameProperties.SCREEN_HEIGHT - camera.camY - 50);
		}
	}
	
	printText(text) {
		this.finalText = text;
		this.nextCharacter(this.currentText);
	}

	constructor() {
		this.canvas = gameProperties.canvas;
		this.context = gameProperties.context;	
		this.linePadding = 20;
		this.lineWidth = 20; //in characters.

		this.CHARACTER_DISPLAY_DELAY = 100;

		this.finalText = "";
		this.currentText = "";
		this.dialogueBoxHeight = 125;
		this.dialogueTextMargin = 40;
		document.fonts.load('10pt "PressStart2P"');
	}

	getDialogue(id) {
		for (var i = 0; i < dialogueData.length; i++) {
			var dialogue = dialogueData[i];
			if (dialogue.id == id)
				return dialogue;
		}
	}

	print(id) {
		gameProperties.isPaused = true;

		var dialogue = this.getDialogue(id);
		
		this.context.fillStyle = "black";
		this.context.fillRect(-camera.camX, gameProperties.SCREEN_HEIGHT - this.dialogueBoxHeight - camera.camY, gameProperties.SCREEN_WIDTH, this.dialogueBoxHeight);

		this.context.strokeStyle = "white";
		this.context.lineWidth = 4;
		this.context.strokeRect(-camera.camX, gameProperties.SCREEN_HEIGHT - this.dialogueBoxHeight - camera.camY, gameProperties.SCREEN_WIDTH, this.dialogueBoxHeight);
		this.context.lineWidth = 1;
		this.context.strokeStyle = "black";
		this.currentText = "";

		var self = this
		setTimeout(function() { 
			if (dialogue.series == true)
				self.print(id + 1);
			else
				gameProperties.isPaused = false;
		}, this.CHARACTER_DISPLAY_DELAY * dialogue.message.length);

		this.printText(dialogue.message);
	}
}
