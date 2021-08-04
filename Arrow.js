class Arrow
{
  constructor(dna)
  {
    if(dna)
    {
      this.dna = dna;
    }
    else
    {
      this.dna = p5.Vector.random2D();
      this.dna.setMag(random(20));
    } 
    this.pos = createVector(50,200);
    this.vel = createVector();
    this.acc = this.dna;
    this.gravity = createVector(0,0.1);
    this.minDist = 1000;
    this.fitness = 0;
    this.completed = false;
    this.crashed = false;
  }
  
  update()
  {
    let  d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if(d < this.minDist)
    {
        this.minDist = d;
    }
    
    if(d < targetSize / 2)
    {
      this.completed = true;
    }
    
   for(let i = 0; i< objects.length; i++)
      {
        if(this.pos.x > objects[i].pos.x - objects[i].size.x / 2 &&         
           this.pos.x < objects[i].pos.x + objects[i].size.x / 2)
        {
          if(abs(this.pos.y - objects[i].pos.y) < objects[i].size.y / 2)
            {
              this.crashed = true;
            }
        }
      }
    
    if(!this.completed && !this.crashed)
    {
      this.vel.add(this.acc);
      this.vel.add(this.gravity);
      this.pos.add(this.vel);
      this.acc = createVector(0,0);
    }
  }
  
  calcFitness()
  {
      this.fitness = 1 / this.minDist;
      
      if(this.carshed)
      {
         this.fitness /= 100;     
      }

      if(this.completed)
      {
         this.fitness *= 5;     
      }
  }
  
  
  show()
  {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(255,100);
    if(this.completed)
    {
      fill(0,255,0,150);//turn arrow green
    }
    rect(0,0,35,5);
    pop();
  }
}