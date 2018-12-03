class Brian {
  constructor() {
    this.brain = new NeuralNetwork([27,27,27,9], 0.3, "relu");
    this.score = 0.0;
  }

  move(game, turn) {
    let inputs = [];

    for (let i = 0; i < 9; i++) {
        if (game[i] == 0) {
            inputs = inputs.concat([0,1,0]);
        } else if (game[i] == turn) {
            inputs = inputs.concat([1,0,0]);
        } else {
            inputs = inputs.concat([0,0,1]);
        }
    }

    let outputs = this.brain.predict(inputs);
    let record = 0, move = 0;

    for (let i = 0; i < 9; i++) {
      if (game[i] === 0 && outputs[i] > record) {
          record = outputs[i];
          move = i;
      }
    }

    return move;
  }

  incScore(a) {
      this.score += a;
  }
}
