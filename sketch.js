var balloon,balloonImg;
var bImg;
var database;
var position;

function preload(){
  bImg = loadImage("images/hab1.png");
  balloonImg = loadImage("images/hab2.png");
}

function setup(){
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(balloonImg);
  balloon.scale = 0.5;
  database = firebase.database();

  var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value",readPosition,showError);
}

function draw(){
  background(bImg);  
  drawSprites();
  textSize(15);
  fill("black");
  strokeWeight(1);
  stroke("red");
  text("*Use arrow keys to move the balloon",20,30)

    if(keyDown(LEFT_ARROW)){
        writePosition(-2,0);
    }

    if(keyDown(RIGHT_ARROW)){
        writePosition(2,0);
    }

    if(keyDown(UP_ARROW)){
        writePosition(0,-2);
        balloon.scale=balloon.scale-0.001;
    }

    if(keyDown(DOWN_ARROW)){
        writePosition(0,2);
        balloon.scale=balloon.scale+0.001;
    }
}

function writePosition(x,y){
  database.ref('balloon/position').set({
      'x':position.x+x,
      'y':position.y+y
  })
}

function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log("Error in writing to the database");
}