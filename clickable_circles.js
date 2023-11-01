let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfbWjJVD3-l3WtZH6ur-I5UcOvirTTW94OsUhBRKulKhkPuwGHTGMNeb3Bk4-54j_v-SQfHbFHuG_v/pub?gid=1286546443&single=true&output=csv";
let circles = [];

function preload(){
  data = loadTable(url,'csv', 'header'); //3er parameter allows the header
}

function setup() {
  createCanvas(windowWidth, 600);
  print(data);

  for (let i = 0; i < data.getRowCount(); i++) {
    let x = random(80, width-80);
    let y = random(80, height-80);
    
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
      this.radius = 80;
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
    fill(255);
    stroke(0);
    ellipse(this.x, this.y, this.radius);
    noStroke();
    fill(this.hex);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(this.colorName, this.x, this.y); 
  } else {
    fill(this.hex);
    stroke(0);
    ellipse(this.x, this.y, this.radius);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(this.colorName, this.x, this.y); 
  }
}


  isOver() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    return d < this.radius-50;

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
