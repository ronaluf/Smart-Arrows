class Obj
{
  constructor(pos,size)
  {
    this.pos = pos
    this.size = size

  }
  
  show()
  {
    rectMode(CENTER);
    fill(255);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
}