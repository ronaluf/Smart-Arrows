//initalize global var
let count = 0;
let lifespan = 200;
let objects = [];
let clicked = false
let newObjPos;
let population;
let traget;
let targetSize = 30;
//set up
function setup() {
  createCanvas(800, 500);
  population = new Population();
  target = createVector(550,200);
  //setting boundaries
  objects.push(new Obj(createVector(300,0),createVector(1200,5)));
  objects.push(new Obj(createVector(0,300),createVector(10,900)));
  objects.push(new Obj(createVector(800,300),createVector(10,900)));
}
//update
function draw() {
  background(0);
  fill(255);
  noStroke();
  //text
  textSize(16)
  text('Smart Arrows by Ron Aluf', 600, 20);
  text('- click to add an obstacle', 20, 20);
  text('- to move the target drag the mouse slowly', 20, 40);
  text('- press Space to restart', 20, 60);


  
  //the main loop
  population.run(); //updating and showing the population of arrows.
  count++; 
  //showing the obstacles
  for(let i = 0; i < objects.length; i++)
  {
    objects[i].show();
  }
  // if life span ends create next genration.
  if(count == lifespan)
  {
    population.evaluate();
    population.selection();
    count = 0;
  }
  //showing the target
  drawTarget();
}

function drawTarget()
{
  fill(255);
  stroke(255);
  if(overTarget())
  {
     fill(0);
  }
  circle(target.x, target.y, targetSize)
}
//adding a new obstacle
function mouseClicked() {
  if(!overTarget())
    {
      objects.push(new Obj(createVector(mouseX,mouseY),createVector(30,30)));
    }
}

function mouseDragged() 
{
  if (overTarget())
  {
    target.x = mouseX ;
    target.y = mouseY ;
  }
}


function overTarget()
{
    let  d = dist(mouseX, mouseY, target.x, target.y);
    if(d < targetSize / 2)
    {
      return true;
    }
}

function reset()
{
  objects = [];
  population = new Population();
  objects.push(new Obj(createVector(300,0),createVector(1200,5)));
  objects.push(new Obj(createVector(0,300),createVector(10,900)));
  objects.push(new Obj(createVector(800,300),createVector(10,900)));
}

function keyPressed() 
{
  if(keyCode === 32)
    {
        reset();

    }
}
