let trails = []; 
let topColor; 
let bottomColor; 

function setup() { 
  createCanvas(800, 800); // Set canvas size
  noStroke(); 
  
  topColor = color(255, 120, 0); 
  bottomColor = color(255, 50, 150); 
} 

function draw() { 
  for (let y = 0; y < height; y++) {
    let percent = map(y, 0, height, 0, 1);
    let lineColor = lerpColor(topColor, bottomColor, percent);
    
    stroke(lineColor);
    line(0, y, width, y);
  }
  
  // 2. Draw the mouse trails on top
  noStroke(); // Turn off stroke for the trail circles
  
  trails.push(createVector(mouseX, mouseY)); 
  
  if (trails.length > 100) { 
    trails.shift(); 
  } 
  
  for (let i = 0; i < trails.length; i++) { 
    let pos = trails[i]; 
    // Fill the circles with white so they pop against the gradient
    fill(255, 255, 255, 150); 
    circle(pos.x, pos.y, i / 2); 
  } 
}