const { rounds } = require("./round.js");

class Game {
  options = ["rock", "paper", "scissors"];

  constructor() {
    this.name = `game`;
  }

  play(choice) {
    const compChoice = Math.floor(Math.random() * 3);
    console.log(
      `\nYou choose ${this.options[choice - 1]}.\tThe Computer chooses ${
        this.options[compChoice]
      }.\n`
    );
    if (
      (choice === "1" && compChoice === 1) ||
      (choice === "2" && compChoice === 2) ||
      (choice === "3" && compChoice === 0)
    ) {
      console.log("You Lose!");
      rounds.lose();
    } else if (
      (choice === "1" && compChoice === 2) ||
      (choice === "2" && compChoice === 0) ||
      (choice === "3" && compChoice === 1)
    ) {
      console.log("You Win!");
      rounds.win();
    } else {
      console.log("It's a Tie!");
      rounds.tie();
    }
  }

  viewStats() {
    console.log(`
        Matches: ${rounds.matches}
        Wins: ${rounds.wins}
        Losses: ${rounds.losses}
        Ties: ${rounds.ties}
        Win Rate: ${
          rounds.wins / rounds.matches
            ? Math.round((rounds.wins / rounds.matches) * 100)
            : 0
        }%`);
  }
}

module.exports = {
  Game,
};
