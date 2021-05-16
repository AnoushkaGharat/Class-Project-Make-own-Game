var ship, shipSailing;
var sea, seaImage;

var coin, coinImage, cashG;

var treasureCollection = 0;

var bomb, bombImage, bombG;

var gameOver, gameOverImage

var PLAY = 1;

var END = 0;

var gameState = PLAY;


function preload(){
  shipSailing = loadAnimation("ship-1.png","ship-2.png","ship-3.png","ship-4.png");
  seaImage = loadImage("sea.png");
  coinImage = loadImage("coin.png");
  bombImage = loadImage("bomb.png");
  gameOverImage = loadImage("GameOver.png");
}

function setup(){
  createCanvas(600,400);
  sea = createSprite(200,180,400,20);
  sea.addImage("sea",seaImage);
  //sea.x = sea.width / 2;
  sea.velocityX = -4;

 cashG=new Group();
 bombG = new Group();
  
  
  
  ship = createSprite(150,280,20,50);
  ship.addAnimation("sailing", shipSailing);
  ship.scale = 0.19;
 
  gameOver = createSprite(300,180,400,20);
  gameOver.addImage(gameOverImage);
  //gameOver.x = gameOver;
  gameOver.visible = false;
  gameOver.scale = 3
}

function draw() {
  background("blue");
  
 if (gameState === PLAY){
  ship.y = World.mouseY
  edges = createEdgeSprites();
  ship.collide(edges);
  
 
 if (sea.x < 100) {
    sea.x = sea.width / 2;
   sea.scale = 1
  }
  
  createCash();
  createBomb();
  
  if (cashG.isTouching(ship)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    
   if (bombG.isTouching(ship)) {
     bombG.destroyEach();
     cashG.destroyEach();
     gameState = END;
  }
  }

  

}
 else if(gameState === END){

 gameOver.visible = true
 sea.visible = false
 ship.visible = false
 cashG.destroyEach();
 bombG.destroyEach();
 cashG.setVelocityXEach(0);
 bombG.setVelocityXEach(0);
}
 drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,450,50);
 }

 


function createCash() {
  if (World.frameCount % 150 == 0) {
  var coin = createSprite(400,Math.round(random(150,300), 10, 10));
  coin.addImage(coinImage);
  coin.scale=0.12;
  coin.velocityX = -3;
  coin.lifetime = 300;
  cashG.add(coin);
  }
}
function createBomb() {
  if (World.frameCount % 250 == 0) {
  var bomb = createSprite(400,Math.round(random(150,300), 10, 10));
  bomb.addImage(bombImage);
  bomb.scale=0.12;
  bomb.velocityX = -3;
  bomb.lifetime = 300;
  bombG.add(bomb);
  }
}