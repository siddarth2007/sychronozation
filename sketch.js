var ball;
var position;
var database;
function setup(){
    database=firebase.database();
    console.log(database);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPositionRef = database.ref('ball/position');
    ballPositionRef.on("value",readPosition,showError); 
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
        drawSprites();
    }
}
function readPosition(data){
    position = data.val();
    console.log(position);
    ball.x=position.x;
    ball.y=position.y;
}
function changePosition(x,y){
   database.ref('ball/position').set({
       'x': position.x+x,
       'y': position.y+y
   })
}
function showError(){
    console.log("error conneting to the database");
}