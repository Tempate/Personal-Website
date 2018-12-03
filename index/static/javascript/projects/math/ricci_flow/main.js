const n_points = 100;

let shape;
let points = [];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvas");

    shape = new Shape();
}

function draw() {
    background(17);
    shape.draw();
}

class Shape {
    constructor() {
        this.points = [];
        for (let i = 0; i < n_points; i++)
            points.push(new Point());
    }

  draw() {
      strokeWeight(1);
      fill(200);
      beginShape();
      for (let i = 0; i < 5; i++)
          curveVertex(points[i].x, points[i].y);
      endShape();

      for (let i = 0; i < 5; i++)
        points[i].draw();
  }
}

class Point {
    constructor() {
        this.x = random() * width;
        this.y = random() * height;
    }

    draw() {
        noStroke();
        fill(200, 0, 0);
        ellipse(this.x, this.y, 10, 10);
    }
}
