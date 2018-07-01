var map = new Map();
var screen = new Screen();
var camera = new Camera();
var dialogue = new Dialogue(camera);
var music = new Audio();
var entities = new Array();
var colliders = new Array();
var postProcessing = new PostProcessing();
var worldSwitcher = new WorldSwitcher();
var dayAndNightCycle = new DayAndNightCycle();
var statistics = new Statistics();
var gameOver = new GameOver();

//has to be after colliders.
var player = new Player();

function mainProcedure() {
	gameProperties.hasStarted = true;
	gameProperties.canvas.style.visibility = "visible";
	document.getElementById("startGameButtonID").style.visibility = "hidden";	
	document.getElementById("titleID").style.visibility = "visible";

	gameProperties.canvas.width = gameProperties.SCREEN_WIDTH;
	gameProperties.canvas.height = gameProperties.SCREEN_HEIGHT;

	start(gameProperties.context);
	setInterval(function() {
		update(gameProperties.context);
	}, 1000 / gameProperties.TARGET_FPS);
	
	worldSwitcher.setWorld("overworld");
}

document.body.onload = function() {
	console.log("Game was loaded successfully.");
}

document.getElementById("canvasID").onmouseover = "";
document.getElementById("startGameButtonID").onclick = mainProcedure;
window.onkeydown = Input.bindKey;
window.onkeyup = Input.releaseKey;
