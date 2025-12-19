class Rounds {
    constructor(){
        this.wins = 0,
        this.losses = 0,
        this.ties = 0,
        this.matches = 0,
        this.winRate = 0
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

    viewStats() {
        console.log(`
        Matches: ${this.matches}
        Wins: ${this.wins}
        Losses: ${this.losses}
        Ties: ${this.ties}
        Win Rate: ${this.wins / this.matches ? Math.round((this.wins / this.matches) * 100) : 0}%`);
    };
};

const rounds = new Rounds();

module.exports = {
    rounds,
}