const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var world, engine;

var stone, sling, gameState, score,time,timeState;
var platform1, platform2, ground,bg;
var blu1, blu2, blu3, blu4, blu5, blu6, blu7, blu8, blu9, blu10, blu11, blu12;
var red1, red2, red3, red4, red5, red6;
var gre1, gre2, gre3, gre4, rge5, gre6;
var grey;
var sBlu, sRed, sGre, whi;
function preload()
{
   bg=loadImage("bg.jpg");
}
function setup() {
  createCanvas(1200,500);
  engine = Engine.create();
  world = engine.world;
  score = 0;
  time = 0;
  timeState="INC";
  textSize(14);

  gameState = "onSling";

  //preset colours
  sBlu = [50, 50, 250];
  sGre = [50, 250, 50];
  sRed = [250, 50, 50];

  //make the platforms and a ground
  platform1 = new Base(530, 440, 320, 30);
  platform2 = new Base(960, 200, 260, 30);
  ground = new Base(width/2, height + 10, width, 30);

  //make the hurler
  stone = new Hexa(130, 240, 30);

  //make the sling for the sling shot
  sling = new String(stone.body, {x: 130, y: 220});

  //the first piramid
  blu1 = new Box(410, 400, 40, 50, sBlu);
  blu2 = new Box(450, 400, 40, 50, sBlu);
  blu3 = new Box(490, 400, 40, 50, sBlu);
  blu4 = new Box(530, 400, 40, 50, sBlu);
  blu5 = new Box(570, 400, 40, 50, sBlu);
  blu6 = new Box(610, 400, 40, 50, sBlu);
  blu7 = new Box(650, 400, 40, 50, sBlu);

  gre1 = new Box(450, 350, 40, 50, sGre);
  gre2 = new Box(490, 350, 40, 50, sGre);
  gre3 = new Box(530, 350, 40, 50, sGre);
  gre4 = new Box(570, 350, 40, 50, sGre);
  gre5 = new Box(610, 350, 40, 50, sGre);

  red1 = new Box(490, 300, 40, 50, sRed);
  red2 = new Box(530, 300, 40, 50, sRed);
  red3 = new Box(570, 300, 40, 50, sRed);

  grey = new Box(530, 250 ,40, 50, 155);

  //the second piramid
  blu8 = new Box(870, 150, 40, 50, sBlu);
  blu9 = new Box(910, 150, 40, 50, sBlu);
  blu10 = new Box(950, 150, 40, 50, sBlu);
  blu11 = new Box(990, 150, 40, 50, sBlu);
  blu12 = new Box(1030, 150, 40, 50, sBlu);

  red4 = new Box(910, 100, 40, 50 ,sRed);
  red5 = new Box(950, 100, 40, 50 ,sRed);
  red6 = new Box(990, 100, 40, 50 ,sRed);

  gre6 = new Box(950, 50, 40, 50, sGre);

  Engine.run(engine);
}

function draw() {
  background(bg);
  Engine.update(engine);
 
  //scoring
  fill(255,0,0);
  textSize(37);
  text("Score: " + score, 50, 40);
  text("Time: " + Math.round(time*3.3) +"ms", 50,75)
  if(score > 2499){
    timeState="STP";
    fill(30, 255, 30);
    textSize(65);
    gameState = "onSling";
    sling.attach(stone.body);
    
    text("Time Taken to Complete: " +  Math.round(time/30)+" Seconds.", 15, 150);
    text("WOW !! YOU WIN !!", 275, 250);
    text("Refresh To Try Again ", 1, 350);
   
  }
  if(timeState==="INC"){
    time++;}
  //2 platforms and a ground
  platform1.display();
  platform2.display();
  ground.display();

  //stone
  stone.display();

  //sling line
  sling.display();
  strokeWeight(1);

  //piramid 1
  blu1.destroy();
  blu2.destroy();
  blu3.destroy();
  blu4.destroy();
  blu5.destroy();
  blu6.destroy();
  blu7.destroy();
  //scoring
  blu1.score();
  blu2.score();
  blu3.score();
  blu4.score();
  blu5.score();
  blu6.score();
  blu7.score();

  gre1.destroy();
  gre2.destroy();
  gre3.destroy();
  gre4.destroy();
  gre5.destroy();
  //scoring
  gre1.score();
  gre2.score();
  gre3.score();
  gre4.score();
  gre5.score();

  red1.destroy();
  red2.destroy();
  red3.destroy();
  //scoring
  red1.score();
  red2.score();
  red3.score();

  grey.destroy();
  grey.score();

  //piramid 2
  blu8.destroy();
  blu9.destroy();
  blu10.destroy();
  blu11.destroy();
  blu12.destroy();
  //scoring
  blu8.score();
  blu9.score();
  blu10.score();
  blu11.score();
  blu12.score();

  red4.destroy();
  red5.destroy();
  red6.destroy();
  //scoring
  red4.score();
  red5.score();
  red6.score();

  gre6.destroy();
  gre6.score();

  drawSprites();
  textSize(30)
  fill(random(200,250),random(200,250),250);
  text("Press Space ", 850, 400);
  text("For Another Chance", 820, 450);
  
  text("To Win, Hit The Boxes !!", 350, 75);
}

//draggind the box
function mouseDragged(){
  if(gameState === "onSling"){
    Body.setPosition(stone.body, {x: mouseX, y: mouseY});
  }
}

//releasing the box
function mouseReleased(){
  gameState = "shot";
  sling.fly();
}

function keyPressed(){
  if(keyCode === 32){
    gameState = "onSling";
    sling.attach(stone.body);
  }
}
