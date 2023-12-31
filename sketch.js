let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfbWjJVD3-l3WtZH6ur-I5UcOvirTTW94OsUhBRKulKhkPuwGHTGMNeb3Bk4-54j_v-SQfHbFHuG_v/pub?gid=1286546443&single=true&output=csv";
let circles = [];

function preload(){
  data = loadTable(url,'csv', 'header'); //3er parameter allows the header
  img = loadImage('crayola.png');
}

function setup() {
  createCanvas(windowWidth, 600);
  print(data);


  for (let i = 0; i < data.getRowCount(); i++) {
    let x = random(25, width-100);
    let y = random(50, height-50);

    
    let colorName = data.getString(i,"color");
    let hex = data.getString (i, "hex");
    let circle = new DraggableCircle(x, y, colorName, hex);
    circles.push(circle);
  }
}

function draw() {
    background(255);
    for (let circle of circles){
      circle.update();
      circle.display();
    }
  }

  class DraggableCircle{
    constructor(x, y, colorName, hex){
      this.x = x;
      this.y = y;
      this.radius = 60;
      this.w = 124;
      this.h = 35;
      this.colorName = colorName;
      this.hex = hex;
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;

      
    }

  update(){
    if (this.dragging){
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }


  display(){
    
    if (this.dragging) {
    noStroke();
    
    fill(255);
    ellipse(this.x+6, this.y+8, this.radius, 20);
    ellipse(this.x+10, this.y+8, this.radius, 28);
    rect(this.x, this.y-10, this.w, this.h);
    fill(this.hex);
    image(img, this.x-26, this.y-12, 150, 40);
    textAlign(LEFT, TOP);
    textSize(10);
    text(this.colorName, this.x+10, this.y+3);

  } else { 
    noStroke();
    fill(this.hex);
    ellipse(this.x+6, this.y+8, this.radius, 20);
    ellipse(this.x+10, this.y+8, this.radius, 28);
    rect(this.x, this.y-10, this.w, this.h);
    fill(0);
    image(img, this.x-26, this.y-12, 150, 40);
    textAlign(LEFT, TOP);
    textSize(10);
    text(this.colorName, this.x+10, this.y+3);
  }
}


  isOver() {
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      return true; 
  } else {
      return false; 
  }
   
  }

  mousePressed() {
    if (this.isOver()) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  mouseReleased() {
    this.dragging = false;
  }
}

function mousePressed() {
  // Check if any circle is clicked, and initiate dragging
  for (let circle of circles) {
    circle.mousePressed();
  }
}

function mouseReleased() {
  // Stop dragging all circles
  for (let circle of circles) {
    circle.mouseReleased();
  }
}
