document.addEventListener('DOMContentLoaded', function() {  // Wait for HTML to fully load before running code
    console.log('JavaScript is now running!');              // Print message to browser console for debugging
    
    // Find HTML elements by their IDs
    const button = document.getElementById("demoButton");

    const message = document.getElementById("messageDisplay");

    const messages = [

    "🚀 Mission Launched",

    "🪐 Orbit Achieved",

    "✨ Future Activated",

    "🌎 Welcome to Tomorrow",

    "🛰 Transmission Received"

    ];

    button.addEventListener("click", () => {

    message.innerHTML =
    messages[Math.floor(Math.random()*messages.length)];

    });
// The setup code section runs once at launch
function setup() {
  // prepare a 2-D canvas
  // the variables define the x and y axes of the canvas
  createCanvas(640, 480);   
}

// The draw code section runs 60 frames per second 
function draw() {
  // this variable defines the background color - it is set to blue
  background(0,0,250);
  // you add your drawing code below
}
function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(240);
  
  // rectangle: x, y, width, height
  rect(50, 90, 150, 70);
  
  // ellipse: x, y, width, height
  ellipse(250, 300, 200, 200);
  
  // line: x1, y1, x2, y2
  line(300, 50, 500, 430);
  
  // triangle: x1, y1, x2, y2, x3, y3
  triangle(450, 50, 600, 50, 535, 300);
}
function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(240);
  
  // rectangle: x, y, width, height
  rect(50, 90, 150, 70);
  
  // ellipse: x, y, width, height
  ellipse(250, 300, 200, 200);
  
  // line: x1, y1, x2, y2
  line(300, 50, 500, 430);
  
  // triangle: x1, y1, x2, y2, x3, y3
  triangle(450, 50, 600, 50, 535, 300);
}
function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(240);
  
  // draw 10 circles in a row
  for (let i = 0; i < 10; i++) {
    // calculate x position for each circle
    let x = i * 60 + 30;
    // draw circle at calculated position
    ellipse(x, height/2, 40, 40);
  }
}
function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(240);
  
  // call our custom function with different parameters
  drawStar(100, 100, 30);
  drawStar(200, 200, 50);
  drawStar(500, 300, 150);
  drawStar(250, 400, 80);
}

// custom function to draw a bespoke shape
function drawStar(x, y, size) {
  // draw a star at the specified position and size
  fill(255, 255, 0);
  ellipse(x, y, size, size);
  // add some details to make it look more star-like
  fill(255, 200, 0);
  ellipse(x, y, size/2, size/2);
}
// declare arrays to store multiple values
let xPositions = [100, 200, 300, 400];
let yPositions = [150, 250, 350, 450];

function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(240);
  
  // loop through all positions in the arrays
  for (let i = 0; i < xPositions.length; i++) {
    // draw a circle at each stored position
    ellipse(xPositions[i], yPositions[i], 30, 30);
  }
}
class Circle {
  constructor(x, y, size) {
    // initialize circle properties
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 2;
  }
  
  // method to move the circle
  move() {
    // update x position to move circle
    this.x = this.x + this.speed;
    
    // wrap around when circle goes off screen
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }
  
  // method to display the circle
  display() {
    // draw the circle at its current position
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// create an instance of the Circle class
let myCircle;

function setup() {
  createCanvas(640, 480);
  // initialize circle object
  myCircle = new Circle(10, height/2-80, 40);
  myCircle2 = new Circle(100, height/2, 60);
  myCircle3 = new Circle(200, height/2+80, 80);
}

function draw() {
  background(240);
  
  // call methods on the circle object
  myCircle.move();
  myCircle.display();
  
  myCircle2.move();
  myCircle2.display();
  
  myCircle3.move();
  myCircle3.display();
}