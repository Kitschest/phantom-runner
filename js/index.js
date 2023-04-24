//Coordenadas
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

let background = document.createElement("img");
background.src = "images/bg1.png"

background.onload = () => {
    ctxB.drawImage(background,0,0,800,600)
}

let gradient = document.createElement("img");
gradient.src = "images/g2.png"

// ctxB.fillStyle = "yellow";
// ctxB.fillRect(0,0,800,600);

ctxF.fillStyle = "black";
ctxF.fillRect(0,0,800,600);

ctxF.save();

// ctxF.arc(200,200,50,0,2*Math.PI);
// ctxF.stroke();
// ctxF.clip();
// ctxF.clearRect(0,0,800,600);

// ctxB.fillStyle = "red";
// ctxB.fillRect(200,200,20,20)

const player = {
    x: 200,
    y: 200,
    arcX: 210,
    arcY: 210,
    gradX: 155,
    gradY: 155,

    recalculatePosition: function(incX, incY) {
        this.x += incX;
        this.arcX += incX;
        this.gradX += incX;
        this.y += incY;
        this.arcY += incY;
        this.gradY += incY;
    },

    print: function() {
        ctxB.fillStyle = "red";
        ctxB.fillRect(this.x,this.y,20,20)
    }
}



const update = function() {
    //limpiar
    ctxF.restore()
    ctxB.clearRect(0,0,800,600);
    ctxF.clearRect(0,0,800,600);

    //recalcular (incorporar obstáculos)


    //redibujar
    // ctxB.fillStyle = "yellow";
    // ctxB.fillRect(0,0,800,600);
    ctxB.drawImage(background,0,0,800,600)

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

document.body.addEventListener("keydown", (e)=>{
    if(e.key == "ArrowUp" || "") {
        player.recalculatePosition(0,-20);
    }
    if(e.key == "ArrowDown") {
        player.recalculatePosition(0,20);
    }
    if(e.key == "ArrowLeft") {
        player.recalculatePosition(-20, 0);
    }
    if(e.key == "ArrowRight") {
        player.recalculatePosition(20, 0);
    }
})