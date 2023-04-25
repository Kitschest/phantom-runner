//Coordenadas

/* tiles = [
    {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
    {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
    {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
    {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
    {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
    {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
    {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
    {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, ] */




const x1 = 0;
const x2 = 20;
const x3 = 40
const x4 = 60
const x5 = 80
const x6 = 100
const x7 = 120
const x8 = 140
const x9 = 160
const x10 = 180
const x11 = 200
const x12 = 220
const x13 = 240
const x14 = 260
const x15 = 280
const x16 = 300
const x17 = 320
const x18 = 340
const x19 = 360
const x20 = 380
const x21 = 400
const x22 = 420
const x23 = 440
const x24 = 460
const x25 = 480
const x26 = 500
const x27 = 520
const x28 = 540
const x29 = 560
const x30 = 580
const x31 = 600
const x32 = 620
const x33 = 640
const x34 = 660
const x35 = 680
const x36 = 700
const x37 = 720
const x38 = 740
const x39 = 760
const x40 = 780



const y1 = 0;
const y2 = 20;
const y3 = 40
const y4 = 60
const y5 = 80
const y6 = 100
const y7 = 120
const y8 = 140
const y9 = 160
const y10 = 180
const y11 = 200
const y12 = 220
const y13 = 240
const y14 = 260
const y15 = 280
const y16 = 300
const y17 = 320
const y18 = 340
const y19 = 360
const y20 = 380
const y21 = 400
const y22 = 420
const y23 = 440
const y24 = 460
const y25 = 480
const y26 = 500
const y27 = 520
const y28 = 540
const y29 = 560
const y30 = 580

/* class Game {
    constructor {
        this.canvasB = document.getElementById("canvasBack");
        this.ctxB = canvasB.getContext("2d");
        this.canvasF = document.getElementById("canvasFront");
        this.ctxF = canvasF.getContext("2d");

    }
} */

let canvasB = document.getElementById("canvasBack");
let ctxB = canvasB.getContext("2d");
let canvasF = document.getElementById("canvasFront");
let ctxF = canvasF.getContext("2d");


//Player animation images
let playerSprite = document.createElement("img");
playerSprite.src = "images/BILLY_BIT.png";

// let playerUp1 = document.createElement("img");
// playerUp1.src = "images/player/up1.png";
// let playerUp2 = document.createElement("img");
// playerUp2.src = "images/player/up2.png";

// let playerRight1 = document.createElement("img");
// playerRight1.src = "images/player/right1.png";
// let playerRight2 = document.createElement("img");
// playerRight2.src = "images/player/right2.png";

// let playerDown1 = document.createElement("img");
// playerDown1.src = "images/player/down1.png";
// let playerDown2 = document.createElement("img");
// playerDown2.src = "images/player/down2.png";

// let playerLeft1 = document.createElement("img");
// playerLeft1.src = "images/player/left1.png";
// let playerLeft2 = document.createElement("img");
// playerLeft2.src = "images/player/left2.png";




let background = document.createElement("img");
background.src = "images/PhantomRunner1.0.png"

background.onload = () => {
    ctxB.drawImage(background,0,0,800,600)
}

let gradient = document.createElement("img");
gradient.src = "images/g2.png"


ctxF.fillStyle = "black";
ctxF.fillRect(0,0,800,600);

ctxF.save();


let direction = "standingDown";

const player = {
    
    x: 400,
    y: 300,
    arcX: 410,
    arcY: 310,
    gradX: 355,
    gradY: 255,

    spritePositions: {
        standingUp: {x_ini: 0, y_ini: 48},
        up: [
            {x_ini: 16, y_ini: 48},{x_ini: 32, y_ini: 48}
        ],
        standingRight: {x_ini: 0, y_ini: 32},
        right: [
            {x_ini: 47, y_ini: 32},{x_ini: 63, y_ini: 32}
        ],
        standingDown: {x_ini: 0, y_ini: 0},
        down: [
            {x_ini: 16, y_ini: 0},{x_ini: 32, y_ini: 0}
        ],
        standingLeft: {x_ini: 0, y_ini: 16},
        left: [
            {x_ini: 32, y_ini: 16},{x_ini: 47, y_ini: 16}
        ],
    },

    recalculatePosition: function(incX, incY) {
        this.x += incX;
        this.arcX += incX;
        this.gradX += incX;
        this.y += incY;
        this.arcY += incY;
        this.gradY += incY;
    },

    print: function() {
        if (direction == "standingUp") {
            ctxB.drawImage(playerSprite,this.spritePositions.standingUp.x_ini, this.spritePositions.standingUp.y_ini, 12,16,this.x,this.y,18,23)
        }
        if (direction == "standingRight") {
            ctxB.drawImage(playerSprite,this.spritePositions.standingRight.x_ini, this.spritePositions.standingRight.y_ini, 12,16,this.x,this.y,18,23)
        }
        if (direction == "standingDown") {
            ctxB.drawImage(playerSprite,this.spritePositions.standingDown.x_ini, this.spritePositions.standingDown.y_ini, 12,16,this.x,this.y,18,23)
        }
        if (direction == "standingLeft") {
            ctxB.drawImage(playerSprite,this.spritePositions.standingLeft.x_ini, this.spritePositions.standingLeft.y_ini, 12,16,this.x,this.y,18,23)
        }
        if (direction == "up") {
            if (iWalk%2 == 0) {ctxB.drawImage(playerSprite,this.spritePositions.up[0].x_ini, this.spritePositions.up[0].y_ini, 12,16,this.x,this.y,18,23)}
            else {ctxB.drawImage(playerSprite,this.spritePositions.up[1].x_ini, this.spritePositions.up[1].y_ini,12,16, this.x,this.y,18,23)}
        }
        if (direction == "right") {
            if (iWalk%2 == 0) {ctxB.drawImage(playerSprite,this.spritePositions.right[0].x_ini, this.spritePositions.right[0].y_ini, 12,16,this.x,this.y,18,23)}
            else {ctxB.drawImage(playerSprite,this.spritePositions.right[1].x_ini, this.spritePositions.right[1].y_ini,12,16, this.x,this.y,18,23)}
        }
        if (direction == "down") {
            if (iWalk%2 == 0) {ctxB.drawImage(playerSprite,this.spritePositions.down[0].x_ini, this.spritePositions.down[0].y_ini, 12,16,this.x,this.y,18,23)}
            else {ctxB.drawImage(playerSprite,this.spritePositions.down[1].x_ini, this.spritePositions.down[1].y_ini,12,16, this.x,this.y,18,23)}
        }
        if (direction == "left") {
            if (iWalk%2 == 0) {ctxB.drawImage(playerSprite,this.spritePositions.left[0].x_ini, this.spritePositions.left[0].y_ini, 12,16,this.x,this.y,18,23)}
            else {ctxB.drawImage(playerSprite,this.spritePositions.left[1].x_ini, this.spritePositions.left[1].y_ini,12,16, this.x,this.y,18,23)}
        }
    }
}


/* class Obstacle {
    constructor (x,y)
} */


const update = function() {
    //limpiar
    ctxF.restore()
    ctxB.clearRect(0,0,800,600);
    ctxF.clearRect(0,0,800,600);

    //recalcular (incorporar obstáculos)


    //redibujar
    // ctxB.fillStyle = "yellow";
    // ctxB.fillRect(0,0,800,600);
    ctxB.drawImage(background,0,0,800,600);

    ctxB.fillStyle = "green";
    ctxB.fillRect(x16,y16,20,20);
    ctxB.fillRect(x17,y16,20,20);


    player.print();

    ctxF.fillStyle = "black";
    ctxF.fillRect(0,0,800,600);

    ctxF.save()

    ctxF.beginPath()
    ctxF.arc(player.arcX,player.arcY,50,0,2*Math.PI);
    ctxF.stroke();
    ctxF.clip();
    ctxF.clearRect(0,0,800,600);
    ctxF.drawImage(gradient,player.gradX,player.gradY,110,110)

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