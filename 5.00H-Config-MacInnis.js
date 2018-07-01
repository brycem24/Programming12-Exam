//INITIALIZATION: a super container that holds useful properties.
var gameProperties = {};

//INITIALIZATION: initialize config properties
gameProperties.TARGET_FPS = 60;
gameProperties.SCREEN_WIDTH = 600;
gameProperties.SCREEN_HEIGHT = 600;
gameProperties.canvas = document.getElementById("canvasID");
gameProperties.context = gameProperties.canvas.getContext("2d");
gameProperties.hasStarted = false;
gameProperties.shadowScale = 2;
gameProperties.shadowAngle = 40;
gameProperties.shadowOpacity = 0.15;
gameProperties.isPaused = false;
gameProperties.isCraftingOpen = false;
gameProperties.isStatisticsOpen = false;
gameProperties.grandmaInRange = false;
gameProperties.bobInRange = false;

//INITIALIZATION: a container for all of the different maps.
var maps = {};
maps.outdoors = outdoorsMapData;
