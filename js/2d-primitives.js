// 2d-primitives.js: static pattern built from p5.js circle primitives.
// Page: 2d-explorations.html   Container: #canvas-container-1
// Uses p5 instance mode so this sketch can share a page with 2d-interactive.js.
var sketch1 = function(p) {

  // All variables are scoped to this instance
  var canvasWidth = 800;
  var canvasHeight = 800;
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

    // The pattern is a 3x3 grid of circles spaced 400px apart, with the corners
    // and edges sitting half off the canvas. Because the spacing matches the
    // canvas size, the shapes line up if the image is tiled, which is what
    // makes it read as seamless.

    // White circles first, at 400px across.
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

    // Orange circles on the same centers but smaller, so each one sits inside
    // a white circle and reads as a ring.
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

// Create the instance. Passing the container id here is what keeps this sketch
// tied to its own div instead of appending to the end of the page.
var myp5_1 = new p5(sketch1, 'canvas-container-1');