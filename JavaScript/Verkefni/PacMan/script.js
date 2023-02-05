
"use strict";

let canvas = document.getElementById('Main');
let ctx = canvas.getContext('2d');

let lastUpdate = Date.now();


let obsticles = [];


function randint(max) {
    return Math.floor(Math.random() * max);
}

function normalize(vector) {
    let magnitude = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    return [vector[0] / magnitude, vector[1] / magnitude];
}

function generateObsticles(){
    let maxTests = 10;
    let minSize = [20, 20];
    let maxSize = [200, 200];
    let posRange = [canvas.width - maxSize[0], canvas.height - maxSize[1]];

    for(let i = 0; i < maxTests; i++){

        let flag = false;
        let pos = [Math.random()*posRange[0], Math.random()*posRange[1]];
        let size = [Math.random()*(maxSize[0]-minSize[0]) + minSize[0], Math.random()*(maxSize[1]-minSize[1]) + minSize[1]];
        for(let s = 0; s < obsticles.length; s++){
            if(isBoxCollition(pos,size,obsticles[s].pos,obsticles[s].size)){
                flag = true;
                break;
            }
        }

        if(flag == false){
            obsticles.push(new Obsticle(pos, size, randColor()));
            break;
        }
    }
}

function getValidEntityPlacement(entitySize, maxTests = 50){

    let posRange = [canvas.width, canvas.height];

    for(let i = 0; i < maxTests; i++){

        let flag = false;
        let pos = [Math.random()*posRange[0]-(entitySize[0] / 2), Math.random()*posRange[1]-(entitySize[1] / 2)];
        for(let s = 0; s < obsticles.length; s++){
            if(isBoxCollition(pos,entitySize,obsticles[s].pos,obsticles[s].size)){
                flag = true;
                break;
            }
        }

        if(flag == false){
            return pos;
        }
    }

}

function isBoxCollition(box1Pos, box1Size, box2Pos, box2Size){
    return (
        box1Pos[0] < box2Pos[0] + box2Size[0] &&
        box1Pos[0] + box1Size[0] > box2Pos[0] &&
        box1Pos[1] < box2Pos[1] + box2Size[1] &&
        box1Pos[1] + box1Size[1] > box2Pos[1]
    );
}
      

function CircleBoxCollition(cVelocity, cPos, cRadius, sPos, sSize) {
    let dx = Math.max(sPos[0] - cPos[0], 0, cPos[0] - (sPos[0] + sSize[0]));
    let dy = Math.max(sPos[1] - cPos[1], 0, cPos[1] - (sPos[1] + sSize[1]));
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > cRadius) {
      return;
    }
  
    if (dx > dy) {
        if (cPos[0] > sPos[0] + sSize[0]) {
            if(cVelocity[0] < 0){
                cVelocity[0] = 0;
            }
        } 
        else {
            if(cVelocity[0] > 0){
                cVelocity[0] = 0;
            }
        }
    } else {

        if (cPos[1] > sPos[1] + sSize[1]) {
            if(cVelocity[1] < 0){
                cVelocity[1] = 0;
            }
        } 
        else {
            if(cVelocity[1] > 0){
                cVelocity[1] = 0;
            }
        }
    }
  }

class PacMan{
    constructor(pos) {
        this.pos = pos;
        this.velocity = [0,0];
        this.mouthAngle = 0.22;
        this.size = 20;
        this.speed = 0.5;
        this.rotation = -45;
        this.mouthAnimationDirection = -1;
        this.mouthAnimationSpeed = 0.0005;
        this.eyeSide = 1;
    }

    move(){
        this.pos[0] += this.velocity[0];
        this.pos[1] += this.velocity[1];
    }

    draw(){
        let now = Date.now();
        let dt = now - lastUpdate;
        lastUpdate = now;

        if(this.mouthAngle <= 0){
            this.mouthAnimationDirection = 1;
        }
        else if(this.mouthAngle >= 0.22){
            this.mouthAnimationDirection = -1;
        }
        this.mouthAngle += dt * this.mouthAnimationDirection * this.mouthAnimationSpeed;

        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(this.rotation);
        ctx.translate(-this.pos[0], -this.pos[1]);

        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.size, this.mouthAngle * Math.PI , (1+this.mouthAngle) * Math.PI, false);
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.size, (1-this.mouthAngle) * Math.PI, (2-this.mouthAngle) * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "rgb(50, 50, 50)";
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] + (this.size * Math.cos(this.mouthAngle*Math.PI)), this.pos[1] + (this.size * Math.sin(this.mouthAngle*Math.PI)));
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] + (this.size * Math.cos(this.mouthAngle*Math.PI)), this.pos[1] + (this.size * -Math.sin(this.mouthAngle*Math.PI)));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1]-(this.size/1.7)*this.eyeSide, this.size*0.13, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(50, 50, 50)";
        ctx.fill();

        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(-this.rotation);
        ctx.translate(-this.pos[0], -this.pos[1]);    
    }

    turn(){ 
        this.velocity = [this.speed * dir[1], this.speed * dir[0]];
        this.rotation = Math.atan2(dir[0], dir[1]);
        this.eyeSide = Math.abs(this.rotation) > 2.2 ? -1 : 1;
    }
};



class Goast{

    constructor(pos){
        this.pos = pos;
        this.radius = 25;
        this.velocity = [0,0];
        this.rotation = 0;
        this.speed = 0.3;
    }

    turn(){
        this.velocity = normalize([-(this.pos[0] - player.pos[0]), -(this.pos[1] - player.pos[1])]);
        this.rotation = -Math.atan2(this.pos[0] - player.pos[0], this.pos[1] - player.pos[1]);
    }

    move(){
        this.pos[0] += this.velocity[0] * this.speed;
        this.pos[1] += this.velocity[1] * this.speed;
    }
    

    draw(){
        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(this.rotation);

        let feet = 4;
        let head_radius = this.radius * 0.8;
        let foot_radius = head_radius / feet;
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "red";
        ctx.lineWidth = this.radius * 0.05;
        ctx.beginPath();
        for (let foot = 0; foot < feet; foot++) {
            ctx.arc(
                (2 * foot_radius * (feet - foot)) - head_radius - foot_radius,
                this.radius - foot_radius,
                foot_radius, 0, Math.PI
            );
        }
        ctx.lineTo(-head_radius, this.radius - foot_radius);
        ctx.arc(0, head_radius - this.radius, head_radius, Math.PI, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(-head_radius / 2.5, -head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(head_radius / 3.5, -head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(-head_radius / 2.5, -head_radius / 1.5, head_radius / 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(head_radius / 3.8, -head_radius / 1.5, head_radius / 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
        ctx.rotate(-this.rotation);
        ctx.translate(-this.pos[0], -this.pos[1]);
    }
};






function randColor(){
    return [Math.random()*255,Math.random()*255,Math.random()*255];
}


class Obsticle{

    constructor(pos, size, color){
        this.pos = pos;
        this.size = size;
        this.color = color;  
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
        ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        ctx.fill();
    }


};

class Pellet{
    constructor(pos){
        this.pos = pos;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], 7, 0, 2*Math.PI);
        ctx.fillStyle = "rgb(200,200,200)";
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.fill();
        ctx.stroke();
    }
};


let player;
let goasts = [];
let pellets = [];

//let box = new Obsticle(200,200,250,250,[255,0,255]);


function init() {
    let numberOfObstricles = 15;
    for(let i = 0; i < numberOfObstricles; i++){
        generateObsticles();
    }

    let numberOfGoasts = 5;
    for(let i = 0; i < numberOfGoasts; i++){
        goasts.push(new Goast(getValidEntityPlacement([50,80])));

    }

    let numberOfPellets = 20;
    for(let i = 0; i < numberOfPellets; i++){
        pellets.push(new Pellet(getValidEntityPlacement([50,50])));
    }

    player = new PacMan(getValidEntityPlacement([40,40], 5000));

    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, 1200, 700); // clear canvas

    const time = new Date();
    player.turn();
    for(let i = 0; i < obsticles.length; i++){
        CircleBoxCollition(player.velocity, player.pos, player.size, obsticles[i].pos, obsticles[i].size);
    }
    player.move();

    for(let i = 0; i < goasts.length; i++){
        goasts[i].turn();
        goasts[i].move();
    }


   
    for(let i = 0; i < obsticles.length; i++){
        obsticles[i].draw();
    }

    for(let i = 0; i < goasts.length; i++){
        goasts[i].draw();
    }

    for(let i = 0; i < pellets.length; i++){
        pellets[i].draw();
    }
    
    player.draw();

    
    window.requestAnimationFrame(draw);
}

let dir = [0,0];
document.addEventListener("keydown", function(event){
    if(event.code === "KeyW"){
        dir[0] = -1;
    }
    else if(event.code === "KeyS"){
        dir[0] = 1;
    }
    else if(event.code === "KeyA"){
        dir[1] = -1;
    }
    else if(event.code === "KeyD"){
        dir[1] = 1;
    }
});

document.addEventListener("keyup", function(event) {
    if(event.code === "KeyW"){
        dir[0] = 0;
    }
    else if(event.code === "KeyS"){
        dir[0] = 0;
    }
    else if(event.code === "KeyA"){
        dir[1] = 0;
    }
    else if(event.code === "KeyD"){
        dir[1] = 0;
    }
});
  

init();
