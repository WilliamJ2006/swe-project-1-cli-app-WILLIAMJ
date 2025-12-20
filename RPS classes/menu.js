const prompt = require("prompt-sync")({ sigint: true });
const { Game } = require("./game.js");

const game = new Game();

class ShowMenu {
  constructor() {
    this.isRunning = true;
    this.menuChoice = "";
    this.choice = "";
  }
  start() {
    while (this.isRunning) {
      console.log("Menu:");
      console.log("1. Play Round");
      console.log("2. View Stats");
      console.log("3. Exit Program\n");

      this.menuChoice = prompt("Pick an option between 1-3: ").trim();
      if (this.menuChoice === "1") {
        console.clear();
        console.log("1. Rock");
        console.log("2. Paper");
        console.log("3. Scissors");
        console.log("4. Go Back\n");
        this.choice = prompt("Choose an option: ");
        if (this.choice === "1" || this.choice === "2" || this.choice === "3") {
          game.play(this.choice);
        } else if (this.choice === "4") {
          console.clear();
          continue;
        } else {
          console.log("Invalid option, try again.");
        }
      } else if (this.menuChoice === "2") {
        game.viewStats();
      } else if (this.menuChoice === "3") {
        this.isRunning = false;
      } else {
        console.log("Invalid option, try again.");
      }
      prompt("\nPress Enter to Continue...");
      console.clear();
    }
  }
}

module.exports = {
  ShowMenu,
};
