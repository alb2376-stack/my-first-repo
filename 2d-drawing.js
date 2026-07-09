// 2D Drawing Sketch - using p5.js instance mode
var sketch1 = function(p) {
  // All variables are scoped to this instance
  var canvasWidth = 800;
  var canvasHeight = 800;
  var canvas;

  p.setup = function() {
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container-1');
  };

  p.draw = function() {
    p.background(245,232,170);
    drawGrid();
    drawPrimitives();
  };

  function drawPrimitives() {
      //orange background
    background(245,232,170);

    fill("white")
    stroke("white")
    circle(0,0,400)
    circle(0,400,400)
    circle(0,800,400)
    circle(400,0,400)
    circle(400,400,400)
    circle(400,800,400)
    circle(800,800,400)
    circle(800,400,400)
    circle(800,0,400)

    fill(245,163,62)
    stroke(245,163,62)
    circle(0,0,300)
    circle(0,400,300)
    circle(0,800,300)
    circle(400,0,300)
    circle(400,400,300)
    circle(400,800,300)
    circle(800,800,300)
    circle(800,400,300)
    circle(800,0,300)
};

// Create the instance
var myp5_1 = new p5(sketch1, 'canvas-container-1'); 