class Brian {
  constructor() {
    this.brain = new NeuralNetwork([9,32,32,9]);
  }

  move(player) {
    let inputs = [];

    for (let spot of spots)
      inputs.push(spot.value-1);

    let record=0,move;
    let outputs = this.brain.predict(inputs);

    for (let i = 0; i < 9; i++) {
      if (outputs[i] > record && spots[i].value === 0) {
        record = outputs[i];
        move = i;
      }
    }

    console.log(move+1);
    spots[move].press(player);
    return move;
  }

  train(game, reward, turn) {
    let steps = [];

    // Split the game into all the different decisions
    // the brain has taken, in a network-readable format.
    // -1 opponents move  0 blank cell  +1 Brian's move
    for (let i = turn; i < game.length; i += 2) {
      let step = [0,0,0,0,0,0,0,0,0];

      for (let k = 0; k < i; k++)
        step[game[k]] = (k % 2 === turn) ? 1 : -1;

      steps.push(step);
    }

    for (let i = 0; i < steps.length; i++)
      this.brain.train_reinforcement(steps[i], reward, i+1);
  }
}
