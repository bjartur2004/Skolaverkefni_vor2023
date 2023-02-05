"use strict";
// canvas er breyta sem geymir vísun á <canvas> í html skrá.
let canvas = document.getElementById('tutorial');
let ctx = canvas.getContext('2d');


function init() {
    window.requestAnimationFrame(draw);
}

class PacMan{
    constructor(pos, velocity) {
        this.pos = pos;
        this.velocity = velocity;
        this.mouthAngle = 0.1;
        this.size = 100;
    }

    move(){
        this.pos[0] += this.velocity[0];
        this.pos[1] += this.velocity[1];
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.size, this.mouthAngle * Math.PI, (1+this.mouthAngle) * Math.PI, false);
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.size, (1-this.mouthAngle) * Math.PI, (2-this.mouthAngle) * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        //x = r × cos( θ ) y = r × sin( θ )
        ctx.strokeStyle = "rgb(50, 50, 50)";
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] + (this.size * Math.cos(this.mouthAngle*Math.PI)), this.pos[1] + (this.size * Math.sin(this.mouthAngle*Math.PI)));
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] + (this.size * Math.cos(this.mouthAngle*Math.PI)), this.pos[1] + (this.size * -Math.sin(this.mouthAngle*Math.PI)));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1]-(this.size/1.7), this.size*0.13, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(50, 50, 50)";
        ctx.fill();
    }
};




function randColor(){
    return [Math.random()*255,Math.random()*255,Math.random()*255]
}

function randVelocity(){
    return [(Math.random()-0.5), -Math.random()*4 - 1]
}

let player = new PacMan([250,250], [0,0]);

function draw() {
    ctx.clearRect(0, 0, 500, 500); // clear canvas

    const time = new Date();
    //player.move();
    player.draw();
    window.requestAnimationFrame(draw);
}
console.log("uwu");
document.addEventListener("keydown", function(event){
    console.log(event.code);
});
init();



