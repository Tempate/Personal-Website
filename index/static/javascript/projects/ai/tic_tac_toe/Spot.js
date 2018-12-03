class Spot {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.player = 0;
  }

  press(player) {
    this.player = player;
    game[this.x + 3*this.y] = player;
  }

  show() {
    fill(255,0,0);
    noStroke();
    strokeWeight(1);
    textSize(80);

    const x = width/6*(2*this.x+1) - 30;
    const y = height/6*(2*this.y+1) + 30;

    switch (this.player) {
      case 1:
        text("X",x,y);
        break;
      case -1:
        text("O",x,y);
        break;
    }
  }
}
