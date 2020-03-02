//set up a basic html page with a canvas element
//set up a basic css file filling the page with the canvas element
//grab the canvas element and set the context to 2d
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//set the width of the canvas, otherwise the canvas will just magnify...its weird
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//we declare the particle array outside of the functions so it is *gasp* globally scoped
let particleArray;

//particle is a function that gives a position, x and y direction, size and colour of the particle
function Particle(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

//the draw function draws an arc as a circle and fills it in with the colour set in the particle
Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

//update moves the particles x and y on the screen, and reverses directions if they hit a boundary
//finally it calls draw
Particle.prototype.update = function(){
    if(this.x + this.size > canvas.width || this.x - this.size < 0){
        this.directionX = -this.directionX;
    }
    if(this.y + this.size > canvas.height || this.y - this.size < 0){
        this.directionY = -this.directionY;
    }
    this.x +=this.directionX;
    this.y +=this.directionY;
    this.draw();
}

//requestAnimationFrame is a baked in command for refreshing the browser window(typically at 60fps)
//in this case animate is the callback, and is being called 60 times per second
//the context is being cleared and the particle array has update run on each part
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update();
    }
}
//init sets the particle array, and runs a for loop for random particles to be pushed
function init(){
    particleArray = [];
    for(let i=0;i<100;i++){
        let size = Math.random()*30;
        let x = Math.random() * (innerWidth - size *2);
        let y = Math.random() * (innerHeight - size *2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        //let color = 'white';
        particleArray.push(new Particle(x,y,directionX,directionY,size,color));
    }
}


init();
animate();
//const particle1 = new Particle(100,100,1,1,20,"white");
//particle1.draw();