const players = 100;

let spots=[], game=[0,0,0,0,0,0,0,0,0];

let mode=0;
let modeButton, slider;

let ga;
let brians = [];
let brian;

function setup() {
  let canvas = createCanvas(400,400);
  canvas.parent("canvas");

  modeButton = createButton("Train");
  modeButton.parent("mode");
  modeButton.class("btn");
  modeButton.mousePressed(updateMode);

  slider = createSlider(1,500,1);
  slider.parent("slider");

  stats = createP();
  stats.parent("stats");

  ga = new Genetics();
  brian = ga.brians[0];

  resetBoard();
}

function draw() {
  background(17);

  if (slider.value() === 1) {
    frameRate(1);
  } else {
    frameRate(60);
  }

  if (mode === 1)
    ga.train(slider.value());

  stroke(255);
  strokeWeight(3);
  line(width/3,0,width/3,height);
  line(width*2/3,0,width*2/3,height);
  line(0,height/3,width,height/3);
  line(0,height*2/3,width,height*2/3);

  for (let spot of spots)
    spot.show();

  stats.html("Draws: " + Math.floor(ga.draws*100/(ga.played+1)) + "%  Played: " + ga.played);
}

function mousePressed() {
  if (mode === 0) {
    let x = Math.floor(3*mouseX/width);
    let y = Math.floor(3*mouseY/height);

    move = x + 3*y;
    game[move] = 1;
    spots[move].press(1);

    switch (checkVictory(game)) {
        case 1:
            setTimeout(window.alert("You win", 3));
        case 2:
            resetBoard();
            break;
    }

    move = brian.move(game, -1);
    game[move] = -1;
    spots[move].press(-1);

    switch (checkVictory(game)) {
        case 1:
            setTimeout(window.alert("Brian wins", 3));
        case 2:
            resetBoard();
            break;
    }
  }
}

function resetBoard() {
  spots=[], game=[0,0,0,0,0,0,0,0,0];
  for (let i = 0; i < 9; i++)
    spots.push(new Spot(i%3, Math.floor(i/3)));
}

function updateMode() {
  mode = 1-mode;

  if (mode === 0)
      brian = ga.get_best();

  resetBoard();
}

function checkVictory(game) {
    let wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [8,4,0],[4,2,6]
    ];

    let result = 2;

    for (let i = 0; i < wins.length; i++) {
        if (game[wins[i][0]] === 0) {
            result = 0;
            continue;
        }

        if (game[wins[i][0]] === game[wins[i][1]] &&
            game[wins[i][0]] === game[wins[i][2]]) {
            return 1;
        }
    }

    if (game[7] === 0)
        result = 0;

    return result;
}
