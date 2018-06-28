class Brian {
  constructor(player) {
    this.player = player;
    this.nn = new NeuralNetwork([9,81,81,9]);
  }

  play() {
    console.log("Thinking")
    let inputs = [];

    for (let spot of spots)
      inputs.push(spot.value-1);

    let record=0,move;
    let outputs = this.nn.predict(inputs);

    for (let i = 0; i < 9; i++) {
      if (outputs[i] > record) {
        record = outputs[i];
        move = i;
      }
    }

    console.log(move+1);
    spots[move].press(this.player);
  }

  train() {

  }
}
