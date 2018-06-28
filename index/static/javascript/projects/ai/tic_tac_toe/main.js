let spots = [];
let brian;
const player = 0;

function setup() {
  let canvas = createCanvas(400,400);
  canvas.parent("canvas");

  brian = new Brian(1-player);

  for (let i = 0; i < 9; i++)
    spots.push(new Spot(i%3, Math.floor(i/3)));
}

function draw() {
  background(17);

  // Draw lines
  stroke(255);
  strokeWeight(3);
  line(width/3,0,width/3,height);
  line(width*2/3,0,width*2/3,height);
  line(0,height/3,width,height/3);
  line(0,height*2/3,width,height*2/3);

  // Draw boxes
  for (let spot of spots)
    spot.show();
}

function mousePressed() {
  let x = Math.floor(3*mouseX/width);
  let y = Math.floor(3*mouseY/height);
  spots[x+3*y].press(player);
  brian.play(spots);
}

class Spot {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.value = 0;
    this.player = 0;
  }

  press(player) {
    this.player = player;
    this.value = -1 + 2*player;
  }

  show() {
    fill(255,0,0);
    noStroke();
    strokeWeight(1);
    textSize(80);
    const x = width/6*(2*this.x+1) - 30;
    const y = height/6*(2*this.y+1) + 30;

    switch (this.value) {
      case -1:
        text("X",x,y);
        break;
      case 1:
        text("O",x,y);
        break;
    }
  }
}
