// start

let canvasB = document.getElementById("canvasBack");
let ctxB = canvasB.getContext("2d");
let canvasF = document.getElementById("canvasFront");
let ctxF = canvasF.getContext("2d");

let playerSprite = document.createElement("img");
playerSprite.src = "./images/BILLY_BIT.png";

let background = document.createElement("img");
background.src = "./images/canvas-background.png" //"./images/main-background.png"

background.onload = () => {
    ctxB.drawImage(background,0,0,800,600)
}

// let gradient = document.createElement("img");
// gradient.src = "images/LAYER2.png"

// let ghostSprite = document.createElement("img");
// ghostSprite.src = "./images/ghost1.png";


ctxF.fillStyle = "black";
ctxF.fillRect(0,0,800,600);

ctxF.save();


let direction = "standingDown";

const player = {
    
    x: 402,
    y: 292,
    arcX: 410,
    arcY: 310,
    gradX: -393  ,  //355,
    gradY: -290 ,  //255,

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
        let newX = this.x + incX;
        let newY = this.y + incY;
    
        if (canMoveTo(newX, newY, 18, 23)) {
            if (newX >= 0 && newX <= canvasB.width - 18) { // 18 is the player's width
                this.x = newX;
                this.arcX += incX;
                this.gradX += incX;
            }
    
            if (newY >= 0 && newY <= canvasB.height - 23) { // 23 is the player's height
                this.y = newY;
                this.arcY += incY;
                this.gradY += incY;
            }
        }
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


const update = function() {
    // Clear
    ctxF.restore();
    ctxB.clearRect(0, 0, 800, 600);
    ctxF.clearRect(0, 0, 800, 600);

    ctxB.drawImage(background, 0, 0, 800, 600);



    player.print();
    ghost.print(); // Add this line to draw the Ghost

    // ctxF.drawImage(gradient, player.gradX, player.gradY, 1600, 1200)

    checkGhostCollision(); // Add this line to check for collisions
};


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


// new changes //


const obstacles = [
    // obstacle data here:

    {x: 0,   y: 0,   w: 220, h: 40},  //1
    {x: 220, y: 0,   w: 40,  h: 88}, //2
    {x: 260, y: 0,   w: 540, h: 40},  //3
    {x: 220, y: 120, w: 40,  h: 149}, //4
    {x: 260, y: 160, w: 160, h: 60},  //5
    {x: 440, y: 160, w: 160, h: 60},  //6
    {x: 560, y: 220, w: 40,  h: 52},  //7
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

  function movePlayer(newX, newY) {
    if (canMoveTo(newX, newY, playerWidth, playerHeight)) {
      playerX = newX;
      playerY = newY;
      draw();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    for (const obstacle of obstacles) {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    }

    ctx.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight);


draw();

movePlayer(playerX + 5, playerY);

}

// GHOST
let ghostSprite = document.createElement("img");
ghostSprite.src = "./images/ghost1.png";

const ghost = {
    x: 200,
    y: 200,
    width: 18,
    height: 23,
    speedX: 2, // horizontal movement speed
    speedY: 1, // vertical movement speed

    print: function() {
        // Update ghost position based on its speed
        this.x += this.speedX;
        this.y += this.speedY;

        // Check if ghost has reached canvas boundaries and reverse direction if necessary
        if (this.x < 0 || this.x + this.width > canvasBack.width) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y + this.height > canvasBack.height) {
            this.speedY *= -1;
        }

        // Draw ghost image at new position
        ctxB.drawImage(ghostSprite, this.x, this.y, this.width, this.height);
    }
};

function checkGhostCollision() {
    if (isColliding(player, ghost)) {
        player.x = 400;
        player.y = 300;
        player.arcX = 410;
        player.arcY = 310;
        player.gradX = -393;
        player.gradY = -290;
    }
}


// Spawn new ghost object with random position and velocity
function spawnGhost() {
    let ghost = {
      x: Math.random() * canvasBack.width,
      y: Math.random() * canvasBack.height,
      width: 18,
      height: 23,
      speedX: (Math.random() - 0.5) * 4, // horizontal movement speed (-2 to 2)
      speedY: (Math.random() - 0.5) * 4, // vertical movement speed (-2 to 2)
  
      print: function() {
        // Update ghost position based on its speed
        this.x += this.speedX;
        this.y += this.speedY;
  
        // Check if ghost has reached canvas boundaries and reverse direction if necessary
        if (this.x < 0 || this.x + this.width > canvasBack.width) {
          this.speedX *= -1;
        }
        if (this.y < 0 || this.y + this.height > canvasBack.height) {
          this.speedY *= -1;
        }
  
        // Draw ghost image at new position
        ctxB.drawImage(ghostSprite, this.x, this.y, this.width, this.height);
  
        // Check for collisions between ghosts and move them away from each other
        for (let i = 0; i < ghosts.length; i++) {
          let otherGhost = ghosts[i];
          if (this !== otherGhost && isColliding(this, otherGhost)) {
            // Move this ghost away from the other ghost
            let dx = this.x - otherGhost.x;
            let dy = this.y - otherGhost.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let minDistance = this.width + otherGhost.width;
            if (distance < minDistance) {
              let moveX = dx * ((minDistance - distance) / distance);
              let moveY = dy * ((minDistance - distance) / distance);
              this.x += moveX;
              this.y += moveY;
              otherGhost.x -= moveX;
              otherGhost.y -= moveY;
            }
          }
        }
      }
    };
  
    // Generate random speed values for new ghost
    let speed = Math.random() * 4;
    let angle = Math.random() * Math.PI * 2;
    ghost.speedX = speed * Math.cos(angle);
    ghost.speedY = speed * Math.sin(angle);
  
    ghosts.push(ghost);
  }
  


