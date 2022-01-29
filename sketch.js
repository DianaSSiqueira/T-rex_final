var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  //createCanvas(600, 200);  // 1 passo
  createCanvas(windowWidth, windowHeight);
  
  
  
  
  
  
  //trex = createSprite(50,180,20,50);  // 2 passo
  trex = createSprite(50,height-100,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  
  
  
  
  
  //ground = createSprite(200,180,400,20);  //3 passo
  ground = createSprite(width/2,height-80,width,20);
  
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  //gameOver = createSprite(300,100); // 6 passo
  gameOver = createSprite(width/2,height/3); 
  gameOver.addImage(gameOverImg);
  
  //restart = createSprite(300,140);  // 7 passo
  restart = createSprite(width/2,height*2/5);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  //invisibleGround = createSprite(200,190,400,10);  //4 passo
  invisibleGround = createSprite(width/2,height-60,width,20);  
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(200);
  //text("Pontuação: "+ score, 500,50);        // 12 passos
  text("Pontuação: "+ score, (width*1/10),50);        // 12 passos
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //altere a animação de trex
    trex.changeAnimation("running", trex_running);  
    
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //defina a velocidade de cada objeto do jogo para 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //mude a animação de trex 
    trex.changeAnimation("collided",trex_collided);
    
    //defina o tempo de vida dos objetos do jogo para que eles não sejam destruídos
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function reset(){
  gameState = PLAY;         
  gameOver.visible = false; 
  restart.visible = false;  
  
  obstaclesGroup.destroyEach();    
  cloudsGroup.destroyEach();       
  score = 0;            
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
   // var obstacle = createSprite(600,165,10,40);  // 5 PASSO
    var obstacle = createSprite(width,height-90,10,40);  // 5 PASSO

    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //gere obstáculos aleatórios
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
    
    //atribua dimensão e tempo de vida ao obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;



    //adicione cada obstáculo ao grupo
    obstaclesGroup.add(obstacle);
  }
}


function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
   // var cloud = createSprite(600,120,40,10);   //8 passos
    var cloud = createSprite(width,height*2/3,40,10);
   // cloud.y = Math.round(random(80,120));        //9 passos
    cloud.y = Math.round(random((height*1/30),(height/2)));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //atribua tempo de vida à variável
    //cloud.lifetime = 100 ;              // 10 passos
    cloud.lifetime = (width/3) ;
    
    //ajuste a profundidade (depth)
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adicione cada nuvem ao grupo
    cloudsGroup.add(cloud);
  }
  
}




