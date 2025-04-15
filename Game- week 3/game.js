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
        console.log(this.positionY)

        if (this.positionY < 0) this.positionY = 0;
        if (this.positionY > 90) this.positionY = 90;

        this.updateUI();
    }
}
    
class Obstacle{
    constructor(){
        this.width=15;
        this.height=5;
        this.positionX= 100;
        this.positionY= Math.floor(Math.random()*(100-this.height+1));
        this.obstacleElm= null;
        this.passed= false;
        this.creatDomElement();
        this.updateUI();

    }

    creatDomElement(){
        this.obstacleElm= document.createElement("div")
        this.obstacleElm.className= "obstacle"
        const parentElm= document.getElementById("board")
        parentElm.appendChild(this.obstacleElm)
    }

    updateUI(){
        //const ObstacleElm=document.getElementsByClassName("obstacle");
        this.obstacleElm.style.width= `${this.width}vw`;
        this.obstacleElm.style.height= `${this.height}vw`;
        this.obstacleElm.style.left = `${this.positionX}vw`;
        this.obstacleElm.style.bottom= `${this.positionY}vh`
        this.obstacleElm.style.color= `blueviolet`;
    }

    moveLeft(){
        this.positionX--
        this.updateUI();
    }
}


let player = new Player();
let obstacle = [];
let score= 0;

setInterval(()=>{
    const newObstacle= new Obstacle;
    obstacle.push(newObstacle);
}, 3000);

// update obstacles
setInterval(() => {
    obstacle.forEach((obstacleInstance) => {
        obstacleInstance.moveLeft();

        // detect collision
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ){console.log("game over");
            
            location.href = "gameover.html";

            //if there is no collision
        
        if (obstacleInstance.positionX+ obstacleInstance.width<0 && !obstacleInstance.passed){
            obstacleInstance.passed= true;
            score++;
        }
        }

    })}, 20)

setInterval(()=>{
    player.updatePositionY();
}, 50);







document.addEventListener("keydown", (e)=>{
    if(e.code === 'Space'){
        console.log("working")
        player.moveUp ();}

})