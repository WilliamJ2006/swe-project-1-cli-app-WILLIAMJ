class Rounds {
  constructor() {
    this.wins = 0,
    this.losses = 0,
    this.ties = 0,
    this.matches = 0,
    this.winRate = 0;
  }

  win() {
    this.wins++;
    this.matches++;
  }

  lose() {
    this.losses++;
    this.matches++;
  }

  tie() {
    this.ties++;
    this.matches++;
  }
}

const rounds = new Rounds();

module.exports = {
  rounds,
};
