window.addEventListener("load", function() {
    //Initialize canvas
    const canvasB = document.getElementById("canvasBack");
    const ctxB = canvasB.getContext("2d");

    //CLASSES
    class Game {
        constructor(playerPlaceholder) {
            this.background = document.createElement("img")
            this.background.src = "images/bg_grid.png"
            //canvasF: document.getElementById("canvasFront"),
           // ctxF: canvasF.getContext("2d"),
           this.countUpdate = 0
           this.player = playerPlaceholder

        }
        

        //GAME METHODS
        drawBackground() {
            ctxB.drawImage(this.background,0,0,800,600)
        }

        //Draw de todo
        draw() {
            
            this.drawBackground();
            //draw player, ghosts etc vvv
            this.player.draw()

        }

        update() {
            this.countUpdate++;
            player.update();  


        }
    }

    class Component {
        constructor(x, y, w, h, /* imgElement */) {
          this.x = x;
          this.y = y;
          this.width = w;
          this.height = h;
          /* this.imgElement = imgElement; */

        }
    
        draw() {
            //ctx is the canvas context used for drawing an image file (ex: .jpeg, .png)
            ctxB.drawImage(this.imgElement, this.x, this.y, this.width, this.height);
        }
    
    }

    class Player extends Component {
        constructor() {
            super(401, 290, 20, 25)
            this.gradX = -393  ;  //355,
            this.gradY = -295 ;  //255,
            this.speedX = 0;
            this.speedY = 0;

            this.playerSprite = document.createElement("img");
            this.playerSprite.src = "images/BILLY_BIT.png"; //"images/player1.png"       

            this.gradient = document.createElement("img");
            this.gradient.src = "images/LAYER2.png"

            this.direction = "standingDown"

            this.timeoutIdUp 
            this.timeoutIdRight 
            this.timeoutIdDown
            this.timeoutIdLeft 
            this.iWalk = 0

            this.newX
            this.newY

            this.spritePositions = {
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
                ]
            }

        }


        isColliding(rect1, rect2) {
            return rect1.x < rect2.x + rect2.w &&
                   rect1.x + rect1.w > rect2.x &&
                   rect1.y < rect2.y + rect2.h &&
                   rect1.y + rect1.h > rect2.y;
        }

        canMoveTo(newX, newY, playerWidth, playerHeight) {
            const playerRect = {
              x: newX,
              y: newY,
              w: playerWidth,
              h: playerHeight
            };
          
            for (const obstacle of obstacles) {
              if (player.isColliding(playerRect, obstacle)) {
                return false;
              }
            }
          
            return true;
        }


        recalculatePosition(incX, incY) {
            let newX = this.x + incX;
            let newY = this.y + incY;
            
            if (this.canMoveTo(newX, newY, 18, 23)) {
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
        }

        update() {
            //player inputs movement, event listeners
            document.body.addEventListener("keydown", (e)=>{
                if(e.key == "ArrowUp" || e.key == "w") {
                    this.recalculatePosition(0,-20);
                    this.direction = "up";
                    this.iWalk++;
                    clearTimeout(this.timeoutIdUp),
                    clearTimeout(this.timeoutIdRight)
                    clearTimeout(this.timeoutIdDown)
                    clearTimeout(this.timeoutIdLeft)
                    
            
                }
                if(e.key == "ArrowDown" || e.key == "s") {
                    this.recalculatePosition(0,20);
                    this.direction = "down";
                    this.iWalk++;
                    clearTimeout(this.timeoutIdUp),
                    clearTimeout(this.timeoutIdRight)
                    clearTimeout(this.timeoutIdDown)
                    clearTimeout(this.timeoutIdLeft)
                }
                if(e.key == "ArrowLeft" || e.key == "a") {
                    this.recalculatePosition(-20, 0);
                    this.direction = "left";
                    this.iWalk++;
                    clearTimeout(this.timeoutIdUp),
                    clearTimeout(this.timeoutIdRight)
                    clearTimeout(this.timeoutIdDown)
                    clearTimeout(this.timeoutIdLeft)
                }
                if(e.key == "ArrowRight" || e.key == "d") {
                    this.recalculatePosition(20, 0);
                    this.direction = "right";
                    this.iWalk++;
                    clearTimeout(this.timeoutIdUp),
                    clearTimeout(this.timeoutIdRight)
                    clearTimeout(this.timeoutIdDown)
                    clearTimeout(this.timeoutIdLeft)
                }
            })
            
            document.body.addEventListener("keyup", (e)=>{
                if(e.key == "ArrowUp" || e.key == "w") {
                    this.timeoutIdUp = setTimeout(() => {this.direction = "standingUp"}, 400)
                }
                if(e.key == "ArrowRight" || e.key == "d") {
                    this.timeoutIdRight = setTimeout(() => {this.direction = "standingRight"}, 400)
                }
                if(e.key == "ArrowDown" || e.key == "s") {
                    this.timeoutIdDown = setTimeout(() => {this.direction = "standingDown"}, 400)
                }
                if(e.key == "ArrowLeft" || e.key == "a") {
                    this.timeoutIdLeft = setTimeout(() => {this.direction = "standingLeft"}, 400)
                }
            })

            
        }

        draw() {
            if (this.direction == "standingUp") {
                ctxB.drawImage(this.playerSprite,this.spritePositions.standingUp.x_ini, this.spritePositions.standingUp.y_ini, 12,16,this.x,this.y,this.width,this.height)
            }
            if (this.direction == "standingRight") {
                ctxB.drawImage(this.playerSprite,this.spritePositions.standingRight.x_ini, this.spritePositions.standingRight.y_ini, /* 100, 100 */ 12,16,this.x,this.y,this.width,this.height)
            }
            if (this.direction == "standingDown") {
                ctxB.drawImage(this.playerSprite,this.spritePositions.standingDown.x_ini, this.spritePositions.standingDown.y_ini, 12,16,this.x,this.y,this.width,this.height)
            }
            if (this.direction == "standingLeft") {
                ctxB.drawImage(this.playerSprite,this.spritePositions.standingLeft.x_ini, this.spritePositions.standingLeft.y_ini, 12,16,this.x,this.y,this.width,this.height)
            }
            if (this.direction == "up") {
                if (this.iWalk%2 == 0) {ctxB.drawImage(this.playerSprite,this.spritePositions.up[0].x_ini, this.spritePositions.up[0].y_ini, 12,16,this.x,this.y,this.width,this.height)}
                else {ctxB.drawImage(this.playerSprite,this.spritePositions.up[1].x_ini, this.spritePositions.up[1].y_ini,12,16, this.x,this.y,this.width,this.height)}
            }
            if (this.direction == "right") {
                if (this.iWalk%2 == 0) {ctxB.drawImage(this.playerSprite,this.spritePositions.right[0].x_ini, this.spritePositions.right[0].y_ini, /* 100, 100 */ 12,16,this.x,this.y,this.width,this.height)}
                else {ctxB.drawImage(this.playerSprite,this.spritePositions.right[1].x_ini, this.spritePositions.right[1].y_ini,/* 100, 100 */ 12,16, this.x,this.y,this.width,this.height)}
            }
            if (this.direction == "down") {
                if (this.iWalk%2 == 0) {ctxB.drawImage(this.playerSprite,this.spritePositions.down[0].x_ini, this.spritePositions.down[0].y_ini, 12,16,this.x,this.y,this.width,this.height)}
                else {ctxB.drawImage(this.playerSprite,this.spritePositions.down[1].x_ini, this.spritePositions.down[1].y_ini,12,16, this.x,this.y,this.width,this.height)}
            }
            if (this.direction == "left") {
                if (this.iWalk%2 == 0) {ctxB.drawImage(this.playerSprite,this.spritePositions.left[0].x_ini, this.spritePositions.left[0].y_ini, 12,16,this.x,this.y,this.width,this.height)}
                else {ctxB.drawImage(this.playerSprite,this.spritePositions.left[1].x_ini, this.spritePositions.left[1].y_ini,12,16, this.x,this.y,this.width,this.height)}
            }

        }

    }


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


        


//create objects
const player = new Player()
const game = new Game(player)

//GAME LOOP
const intervalId = setInterval(()=>{
    ctxB.clearRect(0,0,800,600);
    game.update();
    game.draw();
},60)


/* document.body.addEventListener("keydown", (e)=>{
    if(e.key == "ArrowUp" || e.key == "w") {
        player.recalculatePosition(0,-20);
        player.direction = "up";
        player.iWalk++;
        clearTimeout(player.timeoutIdUp),
        clearTimeout(player.timeoutIdRight)
        clearTimeout(player.timeoutIdDown)
        clearTimeout(player.timeoutIdLeft)
        

    }
    if(e.key == "ArrowDown" || e.key == "s") {
        player.recalculatePosition(0,20);
        player.direction = "down";
        player.iWalk++;
        clearTimeout(player.timeoutIdUp),
        clearTimeout(player.timeoutIdRight)
        clearTimeout(player.timeoutIdDown)
        clearTimeout(player.timeoutIdLeft)
    }
    if(e.key == "ArrowLeft" || e.key == "a") {
        player.recalculatePosition(-20, 0);
        player.direction = "left";
        player.iWalk++;
        clearTimeout(player.timeoutIdUp),
        clearTimeout(player.timeoutIdRight)
        clearTimeout(player.timeoutIdDown)
        clearTimeout(player.timeoutIdLeft)
    }
    if(e.key == "ArrowRight" || e.key == "d") {
        player.recalculatePosition(20, 0);
        player.direction = "right";
        player.iWalk++;
        clearTimeout(player.timeoutIdUp),
        clearTimeout(player.timeoutIdRight)
        clearTimeout(player.timeoutIdDown)
        clearTimeout(player.timeoutIdLeft)
    }
})

document.body.addEventListener("keyup", (e)=>{
    if(e.key == "ArrowUp" || e.key == "w") {
        player.timeoutIdUp = setTimeout(() => {player.direction = "standingUp"}, 400)
    }
    if(e.key == "ArrowRight" || e.key == "d") {
        player.timeoutIdRight = setTimeout(() => {player.direction = "standingRight"}, 400)
    }
    if(e.key == "ArrowDown" || e.key == "s") {
        player.timeoutIdDown = setTimeout(() => {player.direction = "standingDown"}, 400)
    }
    if(e.key == "ArrowLeft" || e.key == "a") {
        player.timeoutIdLeft = setTimeout(() => {player.direction = "standingLeft"}, 400)
    }
}) */



})

