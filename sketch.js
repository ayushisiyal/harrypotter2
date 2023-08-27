var castle, castleimg;
var harry, harryimg;
var ball1,ball2,ball3;
var ballGroup;
var voldimg;
var voldGroup;

function preload() {
 castleimg= loadImage("background1.jpg") ;
 harryimg= loadImage("harry.png");
 ball1=loadImage("ball1.png");
 ball2=loadImage("ball2.png");
 ball3=loadImage("ball3.png");
 voldimg= loadImage("vold.png");
}

function setup(){
createCanvas(windowWidth, windowHeight);
rectMode(CENTER)
castle= createSprite(width/2,height/2);
castle.addImage("castle", castleimg);
castle.scale=0.6;

harry= createSprite(200,200, 30,30);
harry.addImage("hp", harryimg);
harry.scale=0.7;

ballGroup= new Group();
voldGroup= new Group();

}

function draw(){
background("white");

//movement of harry
if(keyDown("left")){
  harry.x= harry.x-5;
}
if(keyDown("right")){
  harry.x= harry.x+5;
}
if(keyDown("up")){
  harry.y= harry.y-5;
}
if(keyDown("down")){
  harry.y= harry.x+5;
}
spawnBalls();
spawnVold();
drawSprites();
}

function spawnBalls(){
  if (frameCount % 60 === 0){
    var ball = createSprite(400,165,10,40);
    ball.velocityX = Math.round(random(-3,3));
    ball.velocityY=Math.round(random(-2,2));
    
    //random x,y pos and random x,y movement
    ball.x= Math.round(random(100, width-100));
    ball.y= Math.round(random(100, height-100));


     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: ball.addImage(ball1);
               break;
       case 2: ball.addImage(ball2);
               break;
       case 3: ball.addImage(ball3);
               break;
              default: break;
     }
    
     //assign scale and lifetime to the obstacle           
    ball.scale=0.1;
    ball.lifetime=200;
    //add each obstacle to the group
     ballGroup.add(ball);
  }
 }

 function spawnVold() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    vold = createSprite(600,100,40,10);
    vold.x= Math.round(random(100, width-100));
    vold.y= Math.round(random(100, height-100));
    vold.addImage(voldimg);
    vold.scale = 0.3;
    
    
     //assign lifetime to the variable
    vold.lifetime = 100;
    
    //adjust the depth
    vold.depth = harry.depth;
    harry.depth = harry.depth + 1;

    voldGroup.add(vold);
    //adding cloud to the group
  
    }
}












/*var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
   restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("rectangle", 0, 0, 250, 80, 0);
  trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4- 3*score/100;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if(score%100 == 0 && score>0){
      checkPointSound.play();
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        jumpSound.play();
        trex.velocityY = -12;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
       /// gameState = END;
       // dieSound.play();
       jumpSound.play();
       trex.velocityY = -12;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation
      trex.changeAnimation("collided", trex_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6-score/100;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

*/