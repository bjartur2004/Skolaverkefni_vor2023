"use strict";
// canvas er breyta sem geymir vísun á <canvas> í html skrá.
let canvas = document.getElementById('tutorial');
let ctx = canvas.getContext('2d');

const gravity = 0.05;

// rauður fylltur litur


function init() {
    window.requestAnimationFrame(draw);
}

class ball{
    constructor(size, color, pos, velocity) {
        this.size = size;
        this.color = color;
        this.pos = pos;
        this.velocity = velocity;
    }

    move(){
        this.pos[0] += this.velocity[0];
        this.pos[1] += this.velocity[1];
        this.velocity[1] += gravity;
        this.velocity[0] *= 0.995;
        this.velocity[1] *= 0.995;
    }

    draw(){
        ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;

        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2*Math.PI);
        ctx.fill();
    }
};

function randColor(){
    return [Math.random()*255,Math.random()*255,Math.random()*255]
}

function randVelocity(){
    return [(Math.random()-0.5), -Math.random()*4 - 1]
}

let balls = [];

function draw() {
    ctx.clearRect(0, 0, 500, 500); // clear canvas
    balls.push(new ball(Math.random()*20+5, randColor(), [250,250], randVelocity()));

    const time = new Date();
    for(let i = 0; i < balls.length; i++){
        balls[i].move();
        balls[i].draw();
    }
    window.requestAnimationFrame(draw);
}


init();
