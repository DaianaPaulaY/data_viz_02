function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let arr = [];
let table;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfbWjJVD3-l3WtZH6ur-I5UcOvirTTW94OsUhBRKulKhkPuwGHTGMNeb3Bk4-54j_v-SQfHbFHuG_v/pub?gid=1286546443&single=true&output=csv";
function preload(){
    table = loadTable(url,'csv', 'header'); //3er parameter allows the header
    print(table);
    
}

function setup() {
    createCanvas(1000, 1000);
}

function draw() {
    background(220);
    textAlign(CENTER, CENTER);
    
    for(let i =0; i< table.getColumnCount(); i++){
        arr.push(i); 
        
        for (let y = 0; y < table.getRowCount(); y++) {
            for (let x = 0; x < table.getRowCount(); x++) {
                let colorName = table.getString(i,"color");
                hex = table.getString (i, "hex");
                let xpos = x *100;
                let ypos = y *100;
                
                let index = y * 7 + x; // find the index
                if(inside(xpos, ypos, 100,100) ){
                    // were inside
                    fill(255);
                    stroke(0);
                    rect(xpos, ypos, 100, 100);
                    noStroke();
                    fill(hex);
                    text(colorName, xpos, ypos, 100,100);
                } else {
                    // not inside
                    fill(hex);
                    stroke(0);
                    rect(xpos, ypos, 100, 100);
                    noStroke();
                    fill(0);
                    text(colorName, xpos, ypos, 100,100);
                }
                
            }
        }
    }
}

function inside(x, y, w, h){
    if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
        return true; 
    } else {
        return false; 
    }
}