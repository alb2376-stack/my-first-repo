// 2d-interactive.js: mouse-trail animation over a gradient background.
// Page: 2d-explorations.html   Container: #canvas-container-2
// Uses p5 instance mode so this sketch can share a page with 2d-primitives.js.
var sketch2 = function(p) {

  // All variables are scoped to this instance
  var trails = [];
  var canvasWidth = 800;
  var canvasHeight = 400;
  var topColor;
  var bottomColor;

  p.setup = function() {
    // Create the canvas and attach it to the container
    var canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container-2');

    p.noStroke();

    topColor = p.color(255, 120, 0);
    bottomColor = p.color(255, 50, 150);
  };

  p.draw = function() {

    // Draw gradient background. p5 has no gradient fill, so I draw one
    // horizontal line per pixel row and shift the color a little each time.
    // Redrawing it every frame also wipes the previous trail.
    for (var y = 0; y < p.height; y++) {
      var percent = p.map(y, 0, p.height, 0, 1);
      var lineColor = p.lerpColor(topColor, bottomColor, percent);

      p.stroke(lineColor);
      p.line(0, y, p.width, y);
    }

    // Draw mouse trails
    p.noStroke();

    // Record where the mouse is on this frame, then drop the oldest position
    // once there are more than 100. Capping the array is what keeps the trail a
    // fixed length instead of growing forever.
    trails.push(p.createVector(p.mouseX, p.mouseY));

    if (trails.length > 100) {
      trails.shift();
    }

    // Size each circle by its position in the array, so the oldest points are
    // tiny and the newest are largest. That taper is what makes it read as a
    // trail following the cursor rather than a line of identical dots.
    for (var i = 0; i < trails.length; i++) {
      var pos = trails[i];

      p.fill(255, 255, 255, 150);
      p.circle(pos.x, pos.y, i / 2);
    }
  };

};

// Create the instance
var myp5_2 = new p5(sketch2, 'canvas-container-2');