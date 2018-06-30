const player = 0;
let spots=[], game=[];
let brian, rplayer;

let mode=0, turn=0;
let modeButton, slider;

let won=0, lost=0, played=0;
let stats;

let time=1;

function setup() {
  let canvas = createCanvas(400,400);
  canvas.parent("canvas");

  modeButton = createButton("Train");
  modeButton.parent("mode");
  modeButton.class("btn");
  modeButton.mousePressed(updateMode);

  slider = createSlider(1,200,1);
  slider.parent("slider");

  stats = createP();
  stats.parent("stats");

  brian = new Brian(1-player);
  rplayer = new RandomPlayer(player);

  resetBoard();
}

function draw() {
  background(17);

  // Train while mode is 1
  for (let z = 0; z < slider.value() && mode; z++) {
    if (time++ % 2 === turn) {
      game.push(rplayer.move(turn));
    } else {
      game.push(brian.move(1-turn));
    }

    switch (checkWin()) {
      case 1: // Three in a row
        if (time % 2 === turn) {
          brian.train(game, -1, 1-turn);
          lost++;
        } else {
          brian.train(game, 1, 1-turn);
          won++;
        }
      case 2: // There is a tie
        resetBoard();
        turn = Math.round(random());
        i = 9;
    }
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

  // Write stats
  stats.html("Won: " + Math.floor(won*100/played) + "%  Drawed: " + Math.floor((played-won-lost)*100/played) + "%  Lost: " + Math.floor(lost*100/played) + "%");
}

function mousePressed() {
  if (!mode) {
    let x = Math.floor(3*mouseX/width);
    let y = Math.floor(3*mouseY/height);
    spots[x+3*y].press(player);

    switch (checkWin()) {
      case 1:
        setTimeout(window.alert("You win!"), 3);
      case 2:
        resetBoard();
    }

    rplayer.move(1-player);

    switch (checkWin()) {
      case 1:
        setTimeout(window.alert("Brian wins"), 3);
      case 2:
        resetBoard();
    }
  }
}

function resetBoard() {
  spots=[], game=[];
  for (let i = 0; i < 9; i++)
    spots.push(new Spot(i%3, Math.floor(i/3)));
  played++;
}

function updateMode() {
  mode = 1-mode;
  resetBoard();
}

function checkWin() {
  let wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  // There is a three in a row
  for (let i = 0; i < wins.length; i++) {
    if (spots[wins[i][0]].value !== 0 &&
        spots[wins[i][0]].value === spots[wins[i][1]].value &&
        spots[wins[i][0]].value === spots[wins[i][2]].value) {
        //console.log("Player " + player + " wins.");
        return 1;
    }
  }

  // There are still blank spaces
  for (let spot of spots) {
    if (spot.value === 0)
      return 0;
  }

  // No three in a row and no blanks; it's a tie
  return 2;
}
