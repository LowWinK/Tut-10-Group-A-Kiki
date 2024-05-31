let spotCircleR = [30, 35, 40, 45, 50]; // Set an array to hold the radius of the circle constituted by spots.
let spotR = 2; // Set the radius of the little spots.
let spacing = 2; // Set the spacing between each spot.
let patterns = []; // Set an array to store every pattern.
const hexagonSide = 68; // Set the side of the hexagon.
let img; // Variable to hold the background image.
let resetButton; // Set a resetButton.
let clearButton; // Set a clearButton.
let beginAnimationButton; // Set a beginAnimationButton.
let stopAnimationButton; // Set a stopAnimationButton.
let rotating = false; // Boolean to decide whether to rotate.

function preload() {
  img = loadImage('assets/dmc.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  arrangePatterns(); // Call the function to arrange the patterns.
  background(img);
  // Display the patterns.
  for (let pattern of patterns) {
    pattern.display();
  }

  resetButton = createButton('Reset all the patterns');
  // Make the button change when the window changes.
  resetButton.position((windowWidth - resetButton.width) / 2, windowHeight - resetButton.height - 10);
  resetButton.mousePressed(resetSketch);

  clearButton = createButton('Clear all the patterns');
  clearButton.position((windowWidth - clearButton.width) / 2, windowHeight - clearButton.height - 50);
  clearButton.mousePressed(clearPatterns);

  beginAnimationButton = createButton('Begin Animation');
  beginAnimationButton.position((windowWidth - beginAnimationButton.width) / 2, windowHeight - beginAnimationButton.height - 90);
  beginAnimationButton.mousePressed(beginAnimation);

  stopAnimationButton = createButton('Stop Animation');
  stopAnimationButton.position((windowWidth - stopAnimationButton.width) / 2, windowHeight - stopAnimationButton.height - 130);
  stopAnimationButton.mousePressed(stopAnimation);
}

function resetSketch() {
  location.reload(); // Reload the page
}

function clearPatterns() {
  // Use the for loop to make every pattern disappear.
  for (let pattern of patterns) {
    pattern.hide();
  }
  redrawPatterns();
}

function beginAnimation() {
  rotating = true;
}

function stopAnimation() {
  rotating = false;
}

// A class to create a hexagon
class Hexagon {
  // The x and y decide the center point of the hexagon.
  // The side decides the length of each side of the hexagon.
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
  }

  display() {
    push();
    translate(this.x, this.y);
    stroke(42, 116, 17);
    strokeWeight(4);
    fill(52, 179, 90);
    rotate(PI / 2); // Rotate the hexagon 90° so that the sides of each hexagon can attach to sides of another hexagon.
    // Draw the hexagon
    beginShape();
    // Calculate every vertex of the hexagon.
    for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 6) {
      let sx = cos(angle) * this.side;
      let sy = sin(angle) * this.side;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
}

class Pattern {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.randomColor = color(random(255), random(255), random(255));
    this.coreColor = color(random(['#F51531', '#018221'])); // These 2 colors extracted from the art 'Wheels of fortune'.
    this.spotCirclePositions = []; // Array to store positions of small circles.
    this.innerColors = []; // An array to store the colors for the 10 circles with radii between 30 and 50.
    this.hidden = false; // Decide if the pattern is hidden.
    this.angle = 0; // Rotation angle for animation

    for (let i = 0; i < 10; i++) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);

      let colorValue = color(r, g, b);

      this.innerColors.push(colorValue);
    }

    // Calculate the positions of spots.
    for (let radius of spotCircleR) {
      // Calculate the circumference of the circle constituted by spots.
      let circumference = TWO_PI * radius;
      // Calculate the number of spots.
      let numSpots = floor(circumference / (2 * spotR + spacing));
      for (let i = 0; i < numSpots; i++) {
        let angle = map(i, 0, numSpots, 0, TWO_PI);
        // Calculate the position of spots.
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;
        this.spotCirclePositions.push({ x, y });
      }
    }

    this.hexagon = new Hexagon(0, 0, hexagonSide);
  }

  display() {
    // If the pattern is hidden, do not display it.
    if (this.hidden === true) {
      return;
    }

    push();
    translate(this.x, this.y);
    //if rotating is true，The angle of each pattern will increase.
    if (rotating) {
      this.angle += 0.05;
      rotate(this.angle);
    }

    // Generate the hexagons at the bottom.
    this.hexagon.display();

    // Generate the biggest circle.
    noStroke();
    fill(145, 225, 147);
    ellipse(0, 0, 110, 110);

    // Generate the spots.
    for (let pos of this.spotCirclePositions) {
      fill(this.randomColor);
      noStroke();
      ellipse(pos.x, pos.y, spotR * 2, spotR * 2);
    }

    // Generate the 10 circles with radii between 30 and 50.
    for (let i = 0; i < 10; i++) {
      let radius = random(30, 50);
      fill(this.innerColors[i]);
      ellipse(0, 0, radius, radius);
    }

    // Generate the core circles.
    // The colors of core circles extracted from the art 'Wheels of fortune'.
    fill(0);
    ellipse(0, 0, 30, 30);
    fill(this.coreColor);
    ellipse(0, 0, 20, 20);
    fill(255);
    ellipse(0, 0, 10, 10);
    pop();
  }

  // Check if the pattern is clicked.
  isClicked(mouseX, mouseY) {
    // Calculates the distance between mouse and the center of the circle.
    let distance = dist(mouseX, mouseY, this.x, this.y);
    // If the distance between mouse and the center of the circle is smaller than 55 (the radius of the big circle).
    return distance < 55;
  }

  // Hide the pattern.
  hide() {
    this.hidden = true;
  }
}

// Make the canvas change according to the window size.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  arrangePatterns();
  background(img);
  for (let pattern of patterns) {
    pattern.display();
  }

  resetButton.position((windowWidth - resetButton.width) / 2, windowHeight - resetButton.height - 10);
  clearButton.position((windowWidth - clearButton.width) / 2, windowHeight - clearButton.height - 50);
  beginAnimationButton.position((windowWidth - beginAnimationButton.width) / 2, windowHeight - beginAnimationButton.height - 90);
  stopAnimationButton.position((windowWidth - stopAnimationButton.width) / 2, windowHeight - stopAnimationButton.height - 130);
}

// It alternates the horizontal offset for each row to create a honeycomb arrangement of patterns.
function arrangePatterns() {
  patterns = [];
  let yOffset = 0;
  let alternate = false;
  while (yOffset < height + 55) {
    let xOffset;
    // According to alternate, if alternate is true, xOffset = 110. If alternate is false, xOffset = 50.
    if (alternate) {
      xOffset = 110;
    } else {
      xOffset = 50;
    }

    for (let x = -xOffset; x < width + 55; x += 120) {
      patterns.push(new Pattern(x, yOffset));
    }
    yOffset += 104;
    alternate = !alternate;
  }
}

// Check whether a pattern is clicked by mouse. If the pattern is clicked, make it hidden.
function mousePressed() {
  for (let pattern of patterns) {
    if (pattern.isClicked(mouseX, mouseY)) {
      pattern.hide();
    }
  }
  redrawPatterns();
}

// Redraw patterns after some are hidden.
function redrawPatterns() {
  background(img);
  for (let pattern of patterns) {
    pattern.display();
  }
}

function draw() {
  //if rotating is true，every patterns in on the canvas will beigin to rotate.
  if (rotating) {
    redrawPatterns();
  }
}
