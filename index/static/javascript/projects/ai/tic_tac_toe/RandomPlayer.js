class RandomPlayer {
  constructor(player) {
    this.player = player;
  }

  move(player) {
    let moves = shuffle([0,1,2,3,4,5,6,7,8]);

    for (let i = 0; i < 9; i++) {
      if (spots[moves[i]].value === 0) {
        spots[moves[i]].press(player);
        return moves[i];
      }
    }
  }
}
