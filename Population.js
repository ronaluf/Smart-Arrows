class Population
{
  constructor()
  {
    this.popSize = 25;
    this.arrows = [];
    this.matingpool = [];
    
    for(let i = 0; i < this.popSize; i++)
    {
      this.arrows.push(new Arrow());
    }  
  }
  
  run()
  {
    for(let i = 0; i < this.arrows.length; i++)
    {
      this.arrows[i].update();
      this.arrows[i].show();
    }  
  }
  
  
  evaluate()
  {
      var maxfit = 0; 
      for(let i = 0; i < this.popSize; i++)
      {
          this.arrows[i].calcFitness();
          if(this.arrows[i].fitness  > maxfit)
          {
              maxfit = this.arrows[i].fitness;
          }
      }
      for(let i = 0; i < this.popSize; i++)
      {
          this.arrows[i].fitness /= maxfit;
      }
    
      this.matingpool = [];
      
      for(let i = 0; i < this.popSize; i++)
      {
          var n = this.arrows[i].fitness * 100;
          for(var j = 0; j < n; j++)
          {
              this.matingpool.push(this.arrows[i]);
          }
      }
  }
  
    
    selection()
    {
      var newArrows = [];
      for(let i = 0; i < this.arrows.length; i++)
        {
          var parentA = random(this.matingpool).dna;
          var parentB = random(this.matingpool).dna; 
          var child = parentA.copy().add(parentB);
          child.setMag((parentB.mag()  + parentA.mag()) / 2)
          if(random(1) < 0.3)
          {
            child = p5.Vector.random2D();
            child.setMag(random(20));

          }
          newArrows[i] = new Arrow(child);
        }   
      this.arrows = newArrows;
    }  
}