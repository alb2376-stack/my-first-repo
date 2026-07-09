// 2D Drawing Sketch - using p5.js instance mode
var sketch1 = function(p) {

  // All variables are scoped to this instance
  var canvasWidth = 400;
  var canvasHeight = 400;
  var canvas;

  p.setup = function() {
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container-1');
    p.noLoop(); // Draw once since the artwork is static
  };

  p.draw = function() {
    p.background(245, 232, 170);
    drawPrimitives();
  };

  function drawPrimitives() {

    // White circles
    p.fill(255);
    p.stroke(255);

    p.circle(0, 0, 400);
    p.circle(0, 400, 400);
    p.circle(0, 800, 400);

    p.circle(400, 0, 400);
    p.circle(400, 400, 400);
    p.circle(400, 800, 400);

    p.circle(800, 0, 400);
    p.circle(800, 400, 400);
    p.circle(800, 800, 400);

    // Orange circles
    p.fill(245, 163, 62);
    p.stroke(245, 163, 62);

    p.circle(0, 0, 300);
    p.circle(0, 400, 300);
    p.circle(0, 800, 300);

    p.circle(400, 0, 300);
    p.circle(400, 400, 300);
    p.circle(400, 800, 300);

    p.circle(800, 0, 300);
    p.circle(800, 400, 300);
    p.circle(800, 800, 300);
  }

}; // <-- closes sketch1

// Create the instance
var myp5_1 = new p5(sketch1, 'canvas-container-1');