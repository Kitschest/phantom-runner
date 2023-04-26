  

const game = {
    canvasB: document.getElementById("canvasBack"),
    ctxB: canvasB.getContext("2d"),
    // canvasF: document.getElementById("canvasFront"),
    // ctxF: canvasF.getContext("2d"),

    background: document.createElement("img"),
    background.src = "images/bg_grid.png"

    background.onload = () => {
        ctxB.drawImage(background,0,0,800,600)
    }

    player: {
        //IMAGES
        playerSprite: document.createElement("img"),
        playerSprite.src: "images/BILLY_BIT.png", //"images/player1.png"         

        let gradient = document.createElement("img");
        gradient.src = "images/LAYER2.png"



    }

}


let canvasB = document.getElementById("canvasBack");
let ctxB = canvasB.getContext("2d");
/* let canvasF = document.getElementById("canvasFront");
let ctxF = canvasF.getContext("2d"); */


//Player animation images
let playerSprite = document.createElement("img");
playerSprite.src = "images/BILLY_BIT.png"; //"images/player1.png" 


let background = document.createElement("img");
background.src = "images/bg_grid.png"

background.onload = () => {
    ctxB.drawImage(background,0,0,800,600)
}

let gradient = document.createElement("img");
gradient.src = "images/LAYER2.png"

//Esto es de cuando usábamos dos canvas.
/* ctxF.fillStyle = "black";
ctxF.fillRect(0,0,800,600);

ctxF.save(); */


let direction = "standingDown";

const player = {
    
    x: 401,
    y: 290,
    w: 20, //18
    h: 25, //23
    // arcX: 410,
    // arcY: 310,
    gradX: -393  ,  //355,
    gradY: -295 ,  //255,

    direction: "standingDown",

    spritePositions: {
        standingUp: {x_ini: 0, y_ini: 48},
        up: [
            {x_ini: 16, y_ini: 48},{x_ini: 32, y_ini: 48}
        ],
        standingRight: //{x_ini: 510, y_ini: 0},
        {x_ini: 0, y_ini: 32},
        right: [
            // {x_ini: 100, y_ini: 0},{x_ini: 200, y_ini: 0}
            {x_ini: 47, y_ini: 32},{x_ini: 63, y_ini: 32}
        ],
        standingDown: {x_ini: 0, y_ini: 0},
        down: [
            {x_ini: 16, y_ini: 0},{x_ini: 32, y_ini: 0}
        ],
        standingLeft: {x_ini: 0, y_ini: 16},
        left: [
            {x_ini: 47, y_ini: 16},{x_ini: 63, y_ini: 16}
        ],
    },




    recalculatePosition: function(incX, incY) {
        let newX = this.x + incX;
        let newY = this.y + incY;
    
        if (canMoveTo(newX, newY, 18, 23)) {
            if (newX >= 0 && newX <= canvasB.width - 18) { // 18 is the player's width
                this.x = newX;
                // this.arcX += incX;
                this.gradX += incX;
            }
    
            if (newY >= 0 && newY <= canvasB.height - 23) { // 23 is the player's height
                this.y = newY;
                // this.arcY += incY;
                this.gradY += incY;
            }
        }        
    },

    print: function() {
        // ctxB.fillStyle = "red";
        // ctxB.fillRect(this.x,this.y,this.w,this.h);


        // CAMBIAR TODOS LOS DIRECTION POR THIS.DIRECTION (Y TB LOS DE LOS EVENT LISTENERS)

        if (direction == "standingUp") {
            ctxB.drawImage(playerSprite,this.spritePositions.standingUp.x_ini, this.spritePositions.standingUp.y_ini, 12,16,this.x,this.y,this.w,this.h)
        }
        if (direction == "standingRight") {
            ctxB.drawImage(playerSprite,this.spritePositions.standingRight.x_ini, this.spritePositions.standingRight.y_ini, /* 100, 100 */ 12,16,this.x,this.y,this.w,this.h)
        }
        if (direction == "standingDown") {
            ctxB.drawImage(playerSprite,this.spritePositions.standingDown.x_ini, this.spritePositions.standingDown.y_ini, 12,16,this.x,this.y,this.w,this.h)
        }
        if (direction == "standingLeft") {
            ctxB.drawImage(playerSprite,this.spritePositions.standingLeft.x_ini, this.spritePositions.standingLeft.y_ini, 12,16,this.x,this.y,this.w,this.h)
        }
        if (direction == "up") {
            if (iWalk%2 == 0) {ctxB.drawImage(playerSprite,this.spritePositions.up[0].x_ini, this.spritePositions.up[0].y_ini, 12,16,this.x,this.y,this.w,this.h)}
            else {ctxB.drawImage(playerSprite,this.spritePositions.up[1].x_ini, this.spritePositions.up[1].y_ini,12,16, this.x,this.y,this.w,this.h)}
        }
        if (direction == "right") {
            if (iWalk%2 == 0) {ctxB.drawImage(playerSprite,this.spritePositions.right[0].x_ini, this.spritePositions.right[0].y_ini, /* 100, 100 */ 12,16,this.x,this.y,this.w,this.h)}
            else {ctxB.drawImage(playerSprite,this.spritePositions.right[1].x_ini, this.spritePositions.right[1].y_ini,/* 100, 100 */ 12,16, this.x,this.y,this.w,this.h)}
        }
        if (direction == "down") {
            if (iWalk%2 == 0) {ctxB.drawImage(playerSprite,this.spritePositions.down[0].x_ini, this.spritePositions.down[0].y_ini, 12,16,this.x,this.y,this.w,this.h)}
            else {ctxB.drawImage(playerSprite,this.spritePositions.down[1].x_ini, this.spritePositions.down[1].y_ini,12,16, this.x,this.y,this.w,this.h)}
        }
        if (direction == "left") {
            if (iWalk%2 == 0) {ctxB.drawImage(playerSprite,this.spritePositions.left[0].x_ini, this.spritePositions.left[0].y_ini, 12,16,this.x,this.y,this.w,this.h)}
            else {ctxB.drawImage(playerSprite,this.spritePositions.left[1].x_ini, this.spritePositions.left[1].y_ini,12,16, this.x,this.y,this.w,this.h)}
        }
    }
}

  //COLLISION WITH OBSTACLES


/* colissionObjects = [
    {x_ini: 0, y_ini: 0, x_end: 40, y_end: 2}, //top wall
    {x_ini: -1, y_ini: 0, x_end: 0, y_end: 40}, //left wall
    {x_ini: 40, y_ini: 0, x_end: 41, y_end: 30}, //right wall
    {x_ini: 0, y_ini: 30, x_end: 41, y_end: 31} //bottom wall
] */


//OBSTACLES = ONLY THE FOUR EXTERNAL WALLS. 

/* 
class ColissionObject {
    constructor (x_ini, y_ini, x_end, y_end) {
        this.x = x_ini * 20;
        this.y = y_ini * 20;
        this.w = Math.abs((x_ini + x_end) * 20)
        this.h = (y_ini + y_end) * 20;
    }

    printObject() {
        ctxB.fillStyle = "green";
        ctxB.fillRect(this.x,this.y,this.w,this.h);

    }
}

let topWall = new ColissionObject(0,0,40,1);
let leftWall = new ColissionObject(-1,0,0,30) //aqui antes puse (-1,0,0,40) 
let rigthWall = new ColissionObject(40,0,41,30)
let bottomWall = new ColissionObject(0,30,41,31)
let obstacles = [];
obstacles.push(topWall);
obstacles.push(leftWall);
obstacles.push(rigthWall);
obstacles.push(bottomWall);

console.log("obstacles",obstacles) */

//-------------------

const obstacles = [
    // obstacle data here:

    {x: 0,   y: 0,   w: 220, h: 40},  //1
    {x: 220, y: 0,   w: 40,  h: 88},  //2
    {x: 260, y: 0,   w: 540, h: 40},  //3
    {x: 220, y: 120, w: 40,  h: 149}, //4
    {x: 260, y: 160, w: 160, h: 60},  //5
    {x: 440, y: 160, w: 160, h: 60},  //6
    {x: 560, y: 220, w: 40,  h: 50},  //7 **
    {x: 600, y: 180, w: 100, h: 60},  //8
    {x: 720, y: 180, w: 80,  h: 60},  //9
    {x: 0,   y: 380, w: 80,  h: 60},  //10
    {x: 100, y: 380, w: 160, h: 60},  //11
    {x: 220, y: 300, w: 40,  h: 80},  //12
    {x: 240, y: 400, w: 80,  h: 60},  //13
    {x: 340, y: 400, w: 160, h: 60},  //14
    {x: 520, y: 400, w: 80,  h: 60},  //15
    {x: 560, y: 300, w: 40,  h: 100}, //16
    {x: 580, y: 420, w: 180, h: 60},  //17
    {x: 780, y: 420, w: 20,  h: 60},  //18
    {x: 400, y: 460, w: 40,  h: 48},  //19
    {x: 400, y: 540, w: 40,  h: 60},  //20 
  ];



function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.w &&
           rect1.x + rect1.w > rect2.x &&
           rect1.y < rect2.y + rect2.h &&
           rect1.y + rect1.h > rect2.y;
}

function canMoveTo(newX, newY, playerWidth, playerHeight) {
    const playerRect = {
      x: newX,
      y: newY,
      w: playerWidth,
      h: playerHeight
    };
  
    for (const obstacle of obstacles) {
      if (isColliding(playerRect, obstacle)) {
        return false;
      }
    }
  
    return true;
}


let countUpdate = 0
const update = function() {
    countUpdate++
    //limpiar
    // ctxF.restore()
    ctxB.clearRect(0,0,800,600);
    // ctxF.clearRect(0,0,800,600);

    //recalcular (incorporar obstáculos)


    //redibujar
    ctxB.drawImage(background,0,0,800,600);

/*     ctxB.fillStyle = "green";
    ctxB.fillRect(x16,y16,20,20);
    ctxB.fillRect(x17,y16,20,20); */


    player.print();
    obstacles.forEach((obstacle)=>{obstacle.printObject()})

    //la actual versión no requiere de dos canvas!!

/*     ctxF.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctxF.fillRect(0,0,800,600);

    ctxF.save()

    ctxF.beginPath()
    ctxF.arc(player.arcX,player.arcY,50,0,2*Math.PI);
    ctxF.stroke();
    ctxF.clip();
    ctxF.clearRect(0,0,800,600); */
   
    // ctxB.drawImage(gradient,player.gradX,player.gradY,1600,1200) *******

    // ctxF.drawImage(gradient,player.gradX,player.gradY,110,110)
}

let intervalId = setInterval(update,60);







let timeoutIdUp
let timeoutIdRight
let timeoutIdDown
let timeoutIdLeft
let iWalk = 0


document.body.addEventListener("keydown", (e)=>{
    if(e.key == "ArrowUp" || e.key == "w") {
        player.recalculatePosition(0,-20);
        direction = "up";
        iWalk++;
        clearTimeout(timeoutIdUp),
        clearTimeout(timeoutIdRight)
        clearTimeout(timeoutIdDown)
        clearTimeout(timeoutIdLeft)
        

    }
    if(e.key == "ArrowDown" || e.key == "s") {
        player.recalculatePosition(0,20);
        direction = "down";
        iWalk++;
        clearTimeout(timeoutIdUp),
        clearTimeout(timeoutIdRight)
        clearTimeout(timeoutIdDown)
        clearTimeout(timeoutIdLeft)
    }
    if(e.key == "ArrowLeft" || e.key == "a") {
        player.recalculatePosition(-20, 0);
        direction = "left";
        iWalk++;
        clearTimeout(timeoutIdUp),
        clearTimeout(timeoutIdRight)
        clearTimeout(timeoutIdDown)
        clearTimeout(timeoutIdLeft)
    }
    if(e.key == "ArrowRight" || e.key == "d") {
        player.recalculatePosition(20, 0);
        direction = "right";
        iWalk++;
        clearTimeout(timeoutIdUp),
        clearTimeout(timeoutIdRight)
        clearTimeout(timeoutIdDown)
        clearTimeout(timeoutIdLeft)
    }
})

document.body.addEventListener("keyup", (e)=>{
    if(e.key == "ArrowUp" || e.key == "w") {
        timeoutIdUp = setTimeout(() => {direction = "standingUp"}, 400)
    }
    if(e.key == "ArrowRight" || e.key == "d") {
        timeoutIdRight = setTimeout(() => {direction = "standingRight"}, 400)
    }
    if(e.key == "ArrowDown" || e.key == "s") {
        timeoutIdDown = setTimeout(() => {direction = "standingDown"}, 400)
    }
    if(e.key == "ArrowLeft" || e.key == "a") {
        timeoutIdLeft = setTimeout(() => {direction = "standingLeft"}, 400)
    }
})