class Particle{
    constructor(x, y, directionX, directionY, size, color,canvas,ctx){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.canvas = canvas;
        this.ctx = ctx;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    update(){
        if(this.x + this.size > this.canvas.width || this.x - this.size < 0){
            this.directionX = -this.directionX;
        }
        if(this.y + this.size > this.canvas.height || this.y - this.size < 0){
            this.directionY = -this.directionY;
        }
        this.x +=this.directionX;
        this.y +=this.directionY;
        this.draw();
    }
}

class Floatation{
    constructor(numBubbles,canv,cont){
        this.canvas = canv;
        this.ctx = this.canvas.getContext(cont);
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.particleArray = [];
        for(let i=0;i<numBubbles;i++){
            let size = Math.random()*30;
            let x = size + (Math.random() * (innerWidth - (size*2)));
            let y = size + (Math.random() * (innerHeight - (size*2)));
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
            this.particleArray.push(new Particle(x,y,directionX,directionY,size,color,this.canvas, this.ctx));
        }
        this.animate();
    }
    animate = () => {
        requestAnimationFrame(this.animate);
        this.ctx.clearRect(0,0,innerWidth,innerHeight);
        for(let i=0;i<this.particleArray.length;i++){
            this.particleArray[i].update();
        }
    }
}
let floaters = new Floatation(60,document.querySelector("#canvas1"), "2d");