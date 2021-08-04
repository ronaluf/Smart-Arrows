let count = 0;
let lifespan = 200;
let objects = [];
let clicked = false
let newObjPos;
let population
let traget
let targetSize
function setup() {
  createCanvas(600, 400);
  population = new Population();
  target = createVector(550,200);
  targetSize = 20;
  objects.push(new Obj(createVector(200,0),createVector(1200,10)));
  objects.push(new Obj(createVector(0,200),createVector(10,400)));
  objects.push(new Obj(createVector(600,200),createVector(10,400)));


}

function draw() {
  background(0);
  text('Smart Arrows by Ron Aluf', 20, 20)
  text('click to add an obstacle', 470, 20)
  population.run();
  count++;
  
  for(let i = 0; i < objects.length; i++)
  {
    objects[i].show();
  }
  
  if(count == lifespan)
  {
    population.evaluate();
    population.selection()
    count = 0;
  }
  drawTarget();
}

function drawTarget()
{
  circle(target.x, target.y, targetSize)
}

function mouseClicked() {
  objects.push(new Obj(createVector(mouseX,mouseY),createVector(30,30)));

}