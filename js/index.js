// start

let canvasB = document.getElementById("canvasBack");
let ctxB = canvasB.getContext("2d");
/* let canvasF = document.getElementById("canvasFront");
let ctxF = canvasF.getContext("2d"); */

let playerSprite = document.createElement("img");
playerSprite.src = "./images/BILLY_BIT.png";

let background = document.createElement("img");
background.src = "./images/canvas-background.png" //"./images/main-background.png"

let intro = document.createElement("img");
intro.src = "images/intro.png"

background.onload = () => {
    ctxB.drawImage(intro,0,0,800,600)
}

let gradient = document.createElement("img");
gradient.src = "images/LAYER2.png"

let ghostSprite = document.createElement("img");
ghostSprite.src = "./images/ghost1.png";

let gameOverImg = document.createElement("img");
gameOverImg.src = "images/gameover.png";


//Esto es de cuando usábamos dos canvas:
/* ctxF.fillStyle = "black";
ctxF.fillRect(0,0,800,600);

ctxF.save(); */


// HEARTS DISPLAY
let hearts = document.createElement("img");
hearts.src = ""



let direction = "standingDown";


const player = {
    
    x: 401,
    y: 290,
    w: 18, //18
    h: 23, //23
    // arcX: 410,
    // arcY: 310,
    gradX: -393  ,  //355,
    gradY: -295 ,  //255,
    countGhostCollisions: 0,

    direction: "standingDown",

    spritePositions: {                                    //BILLY_BIT.png
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

    


    checkGhostCollision: function() {
        for (let i = 0; i < ghosts.length; i++) {
            let ghost = ghosts[i];
            if (isColliding(this, ghost)) {
            this.countGhostCollisions++
                if (this.countGhostCollisions < 5) {
                    this.x = 401
                    this.y = 290
                    this.gradX = -393
                    this.gradY = -295
                } else {
                    gameOver()
                }
               
            }
        }
    },



    recalculatePosition: function(incX, incY) {
        let newX = this.x + incX;
        let newY = this.y + incY;

       
        if (canMoveTo(newX, newY, this.w, this.h)) {
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

let ghosts = []


let countUpdate = 0
const update = function() {
    countUpdate++

    //CLEAN
    // ctxF.restore()
    ctxB.clearRect(0,0,800,600);
    // ctxF.clearRect(0,0,800,600);

    //GENERATE GHOSTS
    if (countUpdate%35 == 0) {
        let ghostTop = new GhostTop;
        let ghostLeft = new GhostLeft;
        let ghostRight = new GhostRight;
        let ghostBottom = new GhostBottom;
        ghosts.push(ghostTop)
        ghosts.push(ghostLeft)
        ghosts.push(ghostRight)
        ghosts.push(ghostBottom)
    }  

    //CHECK LIFE
    if (player.countGhostCollisions == 0) {
        hearts.src = "images/life-5.png"
    } else if (player.countGhostCollisions == 1) {
        hearts.src = "images/life-4.png"
    } else if (player.countGhostCollisions == 2) {
        hearts.src = "images/life-3.png"
    } else if (player.countGhostCollisions == 3) {
        hearts.src = "images/life-2.png"
    } else {
        hearts.src = "images/life-1.png"
    }

    //REDRAW
    ctxB.drawImage(background, 0, 0, 800, 600);

    player.print();
      
    ghosts.forEach((ghost) => {
        ghost.print()
    })

    // ctxF.drawImage(gradient, player.gradX, player.gradY, 1600, 1200)

    player.checkGhostCollision(); // Add this line to check for collisions


    /* ctxF.beginPath()
    ctxF.arc(player.arcX,player.arcY,50,0,2*Math.PI);
    ctxF.stroke();
    ctxF.clip();
    ctxF.clearRect(0,0,800,600); */
   
    //ESTA ES LA LÍNEA DEL GRADIENTE
    // ctxB.drawImage(gradient,player.gradX,player.gradY,1600,1200) //*******

    // (Esta es la línea del gradiente de cuando usábamos dos canvas y la capa superior era black)
    // ctxF.drawImage(gradient,player.gradX,player.gradY,110,110)
}

let intervalId = null
let start = function startGame(){
    intervalId = setInterval(update,60)
}


function gameOver() {   
    
    ctxB.drawImage(gameOverImg, 50, 105, 700, 445)
    clearInterval(intervalId);
    
}



class Ghost {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.w = 18
        this.h = 23
        this.speedX = 2 // horizontal movement speed
        this.speedY = 1 // vertical movement speed        
    }

    print() {
        // Update ghost position based on its speed
        this.x += this.speedX;
        this.y += this.speedY;


        // Draw ghost image at new position
        ctxB.drawImage(ghostSprite, this.x, this.y, this.w, this.h);
    }
};

class GhostTop extends Ghost {    
    constructor() {
        super()
        this.x = Math.random() * 800;
        this.y = 0
    } 
};

class GhostLeft extends Ghost {    
    constructor() {
        super()
        this.x = 0
        this.y = Math.random() * 600;
        this.speedX = 2
        this.speedY = -1
    } 
};

class GhostRight extends Ghost {    
    constructor() {
        super()
        this.x = 800;
        this.y = Math.random() * 600
        this.speedX = -2
        this.speedY = 1
    } 
};

class GhostBottom extends Ghost {    
    constructor() {
        super()
        this.x = Math.random() * 800;
        this.y = 600    
        this.speedX = -2
        this.speedY = -1
    } 
};

let ghostTop = new GhostTop;
ghosts.push(ghostTop)





document.querySelector('#heart-icon').appendChild(hearts)
document.querySelector('#heart-icon>img').classList.add("heart-life")
  


  let timeoutIdUp
  let timeoutIdRight
  let timeoutIdDown
  let timeoutIdLeft
  let iWalk = 0
  
  
  document.body.addEventListener("keydown", (e)=>{
      if(e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
          player.recalculatePosition(0,-20);
          direction = "up";
          iWalk++;
          clearTimeout(timeoutIdUp),
          clearTimeout(timeoutIdRight)
          clearTimeout(timeoutIdDown)
          clearTimeout(timeoutIdLeft)
          
  
      }
      if(e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
          player.recalculatePosition(0,20);
          direction = "down";
          iWalk++;
          clearTimeout(timeoutIdUp),
          clearTimeout(timeoutIdRight)
          clearTimeout(timeoutIdDown)
          clearTimeout(timeoutIdLeft)
      }
      if(e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
          player.recalculatePosition(-20, 0);
          direction = "left";
          iWalk++;
          clearTimeout(timeoutIdUp),
          clearTimeout(timeoutIdRight)
          clearTimeout(timeoutIdDown)
          clearTimeout(timeoutIdLeft)
      }
      if(e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
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
      if(e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
          timeoutIdUp = setTimeout(() => {direction = "standingUp"}, 400)
      }
      if(e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
          timeoutIdRight = setTimeout(() => {direction = "standingRight"}, 400)
      }
      if(e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
          timeoutIdDown = setTimeout(() => {direction = "standingDown"}, 400)
      }
      if(e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
          timeoutIdLeft = setTimeout(() => {direction = "standingLeft"}, 400)
      }
  })

  document.getElementById("play-button").addEventListener("click",start)