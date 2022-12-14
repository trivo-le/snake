window.onload=function(){
    canv=document.getElementById("gc")
    ctx=canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/13);
}
wormPosX=wormPosY=10; //initial position
gs=tc=20; 
applePosX=applePosY=15; //initial position
moveX=moveY=0; //initial direction
trail = [];
tail = 2;
score = 0;

function game(){
    wormPosX+=moveX;
    wormPosY+=moveY;
    if (wormPosX<0){
        wormPosX=tc-1;
    }

    if (wormPosX>tc-1){
        wormPosX=0;
    }

    if (wormPosY<0){
        wormPosY=tc-1;
    }

    if (wormPosY>tc-1){
        wormPosY=0;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canv.width,canv.height);


ctx.fillStyle = "turquoise";

for (var i=0; i<trail.length; i++){
    ctx.fillRect(trail[i].x*gs, trail[i].y*gs,gs-2,gs-2);
    
    //reset
    if (trail[i].x==wormPosX && trail[i].y==wormPosY){ 
        tail = 2;
        score = 0;
    }//if
}//for

trail.push({x:wormPosX, y:wormPosY});
while(trail.length>tail){
    trail.shift();
}//while

//get the apple
if(applePosX==wormPosX && applePosY==wormPosY){
    tail++;
    score++;
    //apple random position
    applePosX=Math.floor(Math.random()*tc);
    applePosY=Math.floor(Math.random()*tc);
}

ctx.fillStyle="red";
ctx.fillRect(applePosX*gs, applePosY*gs, gs-2, gs-2);

document.getElementById("score").innerText = score;
}  

//movement
function keyPush(evt){
switch(evt.keyCode){
     case 37: //left
        moveX=-1; moveY=0;
        break;
    case 38: //up
        moveX=0; moveY=-1;
        break;
    case 39: //right
        moveX=1, moveY=0;
        break;
    case 40: //down
        moveX=0; moveY=1;
        break;
}

}