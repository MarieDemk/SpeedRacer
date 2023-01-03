var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var gameState;
var car1Img, car2Img, track;
var car1, car2, cars = [];
var allPlayers = [];
var fuels, powerCoins, obstacles;
var fuelImg, coinImg, obstacle1Img, obstacle2Img;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1Img = loadImage("assets/car1.png");
  car2Img = loadImage("assets/car2.png");
  track = loadImage("assets/track.jpg");
  coinImg = loadImage("assets/goldCoin.png");
  fuelImg = loadImage("assets/fuel.png");
  obstacle1Img = loadImage("assets/obstacle1.png");
  obstacle2Img = loadImage("assets/obstacle2.png");
  lifeImg = loadImage("assets/life.png");
  blastImg = loadImage("assets/blast.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();
  game.getState();

}

function draw() {
  background(backgroundImage);
  if (playerCount == 2) {
    game.updateState(1)
  }
  if (gameState == 1) {
    
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

