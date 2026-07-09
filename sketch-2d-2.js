// Mouse Trail Sketch - using p5.js instance mode
var sketch2 = function(p) {

  // All variables are scoped to this instance
  var trails = [];
  var canvasWidth = 400;
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

    // Draw gradient background
    for (var y = 0; y < p.height; y++) {
      var percent = p.map(y, 0, p.height, 0, 1);
      var lineColor = p.lerpColor(topColor, bottomColor, percent);

      p.stroke(lineColor);
      p.line(0, y, p.width, y);
    }

    // Draw mouse trails
    p.noStroke();

    trails.push(p.createVector(p.mouseX, p.mouseY));

    if (trails.length > 100) {
      trails.shift();
    }

    for (var i = 0; i < trails.length; i++) {
      var pos = trails[i];

      p.fill(255, 255, 255, 150);
      p.circle(pos.x, pos.y, i / 2);
    }
  };

};

// Create the instance
var myp5_2 = new p5(sketch2, 'canvas-container-2');