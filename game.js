class Player{
    constructor(){
        this.width= 5;
        this.height= 7;
        this.positionX= 10;
        this.positionY= 50; 
        this.speedY=0;
        this.gravity= 0.3
        this.jump= 3
        
        this.updateUI(); 
    }

    updateUI(){
        const playerElm= document.getElementById("player");
        playerElm.style.width= this.width + "vw";
        playerElm.style.height= this.height +"vw";
        playerElm.style.left = this.positionX + "vw";
        playerElm.style.bottom = this.positionY + "vh";
    

    }
  
    moveUp(){  
        this.speedY= this.jump;
    }

    updatePositionY(){
        this.speedY= this.speedY-this.gravity;
        this.positionY= this.positionY+this.speedY;

        if (this.positionY < 0) this.positionY = 0;
        if (this.positionY > 90) this.positionY = 90;

        this.updateUI();
    }
}
    
class Obstacle{
    constructor(){
        this.width=20;
        this.height=5;
        this.positionX= 100;
        this.positionY= Math.floor(Math.random()*(100-this.height+1));
        this.passed= false;

        this.obstacleElm = document.createElement("div");
        this.obstacleElm.className = "obstacle";
        document.getElementById("board").appendChild(this.obstacleElm);

        this.updateUI();

    }


    updateUI(){       
        this.obstacleElm.style.width= `${this.width}vw`;
        this.obstacleElm.style.height= `${this.height}vw`;
        this.obstacleElm.style.left = `${this.positionX}vw`;
        this.obstacleElm.style.bottom= `${this.positionY}vh`
    }

    moveLeft(){
        const speed = 1 +score/100;
        this.positionX -= speed;
        //console.log("obstacle position", this.positionX)
        this.updateUI();
    }
}


let player;
let obstacle = [];
let score= 0;
let gameInterval;
let obstacleInterval;
let timeCounter = 0;
let obstacleDelay = 30;
let playerUpdateInterval;

function startGame(){
    player= new Player();
    obstacle = [];
    score= 0;

    playerUpdateInterval=setInterval(()=>{  
        player.updatePositionY();
    }, 50);

    createObstacles();
}

function createObstacles(){
    clearInterval(obstacleInterval);
    obstacleInterval= setInterval(()=>{
        if(obstacle.length === 0 || obstacle[obstacle.length-1].positionX<80){
            const newObstacle= new Obstacle;
            obstacle.push(newObstacle);
        }
    }, Math.max(500, 1500 - score*10));
    //console.log("new obstacle created:", this)
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    clearInterval(playerUpdateInterval); // Clear player update interval
    location.href = `gameover.html?score=${score}`;
}

// update obstacles
gameInterval = setInterval(() => {
    obstacle.forEach((obstacleInstance, index) => {
        obstacleInstance.moveLeft();

        if (obstacleInstance.positionX + obstacleInstance.width < 0) {
            obstacleInstance.obstacleElm.remove();
            obstacle.splice(index, 1);
        }

        // detect collision
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ) {
            endGame();
        } else if (obstacleInstance.positionX + obstacleInstance.width < 0 && !obstacleInstance.passed) {
            obstacleInstance.passed = true;
            score = score + 10;
            
            if(score === 50){
             obstacleDelay= Math.max(10, obstacleDelay-5);
             createObstacles();
            }
            document.getElementById("score").textContent= `Score: ${score}`
            console.log(document.getElementById("score"));
            
        }

    });
}, 20);




document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none"; // Hide start screen
    document.getElementById("board").style.display = "block";
    startGame();
});


document.addEventListener("keydown", (e)=>{
    if(e.code === 'Space'){
        // console.log("working")
        player.moveUp ();}

})





  