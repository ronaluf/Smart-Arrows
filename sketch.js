//initalize global var
let count = 0;
let lifespan = 200;
let objects = [];
let targetDrag = false
let startDrag = false
let newObjPos;
let population;
let traget;
let start;
let targetSize = 30;
let startSize = 30;

//set up
function setup() {
  createCanvas(800, 500);
  target = createVector(550,200);
  start = createVector(50,200);
  population = new Population();

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
  text('- to move the target or the starting point drag it with the mouse', 20, 40);
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
  //showing the target and the starting point
  drawTarget();
  drawStart();
}

function drawTarget()
{
  fill(255,50,50,200);
  stroke(255);
  if(overTarget())
  {
     fill(0);
  }
  circle(target.x, target.y, targetSize)
}

function drawStart()
{
  fill(50,255,50,200);
  stroke(255);
  if(overStart())
  {
     fill(0);
  }
  circle(start.x, start.y, startSize)
}

//adding a new obstacle
function mouseClicked() {
  if(!overTarget() && !overStart())
    {
      objects.push(new Obj(createVector(mouseX,mouseY),createVector(30,30)));
    }
}
//draging the target and the start
function mouseDragged() 
{
  if(overTarget())
  {
      targetDrag = true;
  }
  if(overStart())
  {
      startDrag = true;
  }
  
  if (targetDrag)
  {
    target.x = mouseX ;
    target.y = mouseY ;
  }
  if (startDrag)
  {
    start.x = mouseX ;
    start.y = mouseY ;
  }
}


function mouseReleased()
{
  targetDrag = false;
  startDrag = false

}

//checking if mouse is on the target
function overTarget()
{
    let  d = dist(mouseX, mouseY, target.x, target.y);
    if(d < targetSize / 2)
    {
      return true;
    }
}
//checking if mouse is on the starting point
function overStart()
{
    let  d = dist(mouseX, mouseY, start.x, start.y);
    if(d < startSize / 2)
    {
      return true;
    }
}
//reset
function reset()
{
  objects = [];
  population = new Population();
  objects.push(new Obj(createVector(300,0),createVector(1200,5)));
  objects.push(new Obj(createVector(0,300),createVector(10,900)));
  objects.push(new Obj(createVector(800,300),createVector(10,900)));
}
//reset if space is pressed
function keyPressed() 
{
  if(keyCode === 32)
    {
        reset();

    }
}
