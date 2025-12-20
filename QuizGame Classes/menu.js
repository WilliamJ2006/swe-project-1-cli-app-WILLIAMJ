const prompt = require("prompt-sync")({ sigint: true });
const { Game } = require("./game.js");

const game = new Game();

class ShowMenu {
  constructor() {
    this.isRunning = true;
    this.action = "";
  }

  start() {
    while (this.isRunning) {
      console.log("1. Start Quiz");
      console.log("2. View High Score");
      console.log("3. Clear Scores");
      console.log("4. Exit\n");

      this.action = prompt("Choose an Action (Enter 1-4): ").trim();
      if (this.action === "1") {
        console.clear();
        game.startQuiz();
      } else if (this.action === "2") {
        console.clear();
        game.viewScores();
      } else if (this.action === "3") {
        game.clearScores();
      } else if (this.action === "4") {
        console.clear();
        this.isRunning = false;
      } else {
        console.log("Invalid Option, Please Try Again!");
      }
      prompt("\nPress Enter to Continue...");
      console.clear();
    }
  }
}

module.exports = {
  ShowMenu,
};
