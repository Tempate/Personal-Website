const player = 0;
let spots = [];
let brian;

let mode = 0;
let modeButton;

function setup() {
  let canvas = createCanvas(400,400);
  canvas.parent("canvas");

  modeButton = createButton("Train");
  modeButton.mousePressed(updateMode);

  brian = new Brian(1-player);

  for (let i = 0; i < 9; i++)
    spots.push(new Spot(i%3, Math.floor(i/3)));
}

function draw() {
  background(17);

  if (mode) {
    
  }

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
  if (!mode) {
    let x = Math.floor(3*mouseX/width);
    let y = Math.floor(3*mouseY/height);
    spots[x+3*y].press(player);
    brian.play(spots);
  }
}

function updateMode() {
  mode = 1-mode;
}

function checkWin(player) {
  let wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let i = 0; i < wins.length; i++) {
    if (spots[wins[i][0]].value === spots[wins[i][1]].value &&
        spots[wins[i][0]].value === spots[wins[i][2]].value) {
        //console.log("Player " + player + " wins.");
        return true;
    }
  }

  return false;
}
