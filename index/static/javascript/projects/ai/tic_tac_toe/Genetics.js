class Genetics {
    constructor() {
        this.draws = 0;
        this.played = 0;
        this.brians = [];

        for (let i = 0; i < players; i++)
            this.brians[i] = new Brian();
    }

    train(k) {
        for (let i = 0; i < k; i++) {
            this.compete(1);
            this.evolve();
        }
    }

    compete(k) {
        for (let i = 0; i < 1; i += 2) {
            this.play(this.brians[i], this.brians[i+1], k);
        }
    }

    play(a, b, k) {
        for (let i = 0; i < k; i++) {
            let game = [0,0,0,0,0,0,0,0,0];
            let turn = (Math.random() > 0.5) ? 1 : -1;

            while (turn !== 0) {
                if (turn == 1) {
                    game[a.move(game, turn)] = turn;
                } else {
                    game[b.move(game, turn)] = turn;
                }

                switch (checkVictory(game)) {
                    case 1:
                        a.incScore(turn);
                        b.incScore(-turn);
                        turn = 0;
                        break;
                    case 2:
                        a.incScore(0.5);
                        b.incScore(0.5);
                        this.draws++;
                        turn = 0;
                        break;
                    default:
                        turn = turn - turn*2;
                        break;
                }
            }

            this.played++;
        }

    }

    evolve() {
        let pool = [];

        for (let brian of this.brians) {
            for (let i = -9; i < brian.score; i++) {
                pool.push(brian);
            }
        }

        for (let i = 0; i < 100; i++) {
            let choice = Math.floor(Math.random() * pool.length);
            let brian = pool.pop(choice);
            brian.brain.mutate();
            brian.score = 0;
            this.brians[i] = brian;
        }
    }

    get_best() {
        let record = 0;
        let chosen;

        for (let i = 0; i < 10; i++) {
            this.brians = shuffle(this.brians);
            this.compete(1);
        }

        for (let brian of this.brians) {
            if (brian.score > record) {
                record = brian.score;
                chosen = brian;
            }
        }

        return brian;
    }
}
