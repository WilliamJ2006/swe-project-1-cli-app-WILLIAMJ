const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const { Questions } = require("./questions");

class Game {
  highScore = [];

  loadHighScore() {
    if (!fs.existsSync("./highscore.json")) {
      fs.writeFileSync("./highscore.json", JSON.stringify([], null, 2));
      this.highScore = [];
    } else {
      let scores = fs.readFileSync("./highscore.json", "utf-8");
      this.highScore = JSON.parse(scores);
      this.highScore.sort(
      (a, b) => b.score * Math.log2(b.questionCount + 1) - a.score * Math.log2(a.questionCount + 1));
      this.highScore = this.highScore.slice(0, 5);
    }
  }

  addHighScore(playerScore) {
    this.highScore.unshift(playerScore);
    this.highScore.sort(
      (a, b) => b.score * Math.log2(b.questionCount + 1) - a.score * Math.log2(a.questionCount + 1)
    );
    this.highScore = this.highScore.slice(0, 5);
    fs.writeFileSync(
      "./highscore.json",
      JSON.stringify(this.highScore, null, 2)
    );
  }

  startQuiz() {
    const question = new Questions();
    this.loadHighScore();
    const score = { correct: 0, total: 0 };
    const finalScore = {};
    let questionNum = 0;
    let questionRunning = true;
    let qCount = Number(prompt("How many questions do you want?: ").trim());
    while (qCount <= 0) {
      console.log("\nInvalid! Please try again.");
      qCount = Number(prompt("How many questions do you want?: ").trim());
    }
    while (questionRunning) {
      question.randQ();
      console.log(`Question ${++questionNum}`);
      console.log(`\n${question.question}?`);
      question.choices.forEach((answer, index) =>
        console.log(`${index + 1}. ${answer}`)
      );
      let choice = Number(prompt("Enter your answer (1-4): "));
      while (!(choice < 5 && choice > 0) || choice !== Math.floor(choice)) {
        console.log("\nInvalid! Please try again.");
        choice = Number(prompt("Enter your answer (1-4): "));
      }
      if (choice - 1 === question.answerIndex) {
        console.clear();
        console.log("\nCorrect! Well done!");
        score.correct++;
        score.total++;
      } else {
        console.clear();
        console.log("Incorrect! Sorry!");
        score.total++;
      }
      console.log(
        `Current Score: ${score.correct}/${score.total} (${Math.round(
          (score.correct / score.total) * 100
        )}%)\n`
      );
      if (questionNum === qCount) {
        console.log(`\nThanks for playing!`);
        questionRunning = false;
      }
    }
    if (
      this.highScore.find(
        (player) =>
          player.score * Math.log2(player.questionCount + 1) <= Math.round((score.correct / score.total) * 100) * Math.log2(score.total +1)
      ) ||
      this.highScore.length < 5
    ) {
      console.log("Congratulations! You scored a high score!");
      let name = prompt("Enter your name: ");
      while (!name.match(/^[a-zA-Z]+$/)) {
        console.log("\nInvalid! Please try again.");
        name = prompt("Enter your name: ");
      }
      finalScore.name = name;
      finalScore.score = Math.round((score.correct / score.total) * 100);
      finalScore.questionCount = qCount;
      let date = new Date();
      finalScore.dateOfScore = `${date.getMonth() + 1}/${date.getDate()}/${date
        .getFullYear()
        .toString()
        .slice(2)}`;
      this.addHighScore(finalScore);
    }
  }

  viewScores() {
    this.loadHighScore();
    if (this.highScore.length === 0) {
      console.log("No high scores yet!");
    } else {
      let scoreList = 1;
      console.log(`High Scores:\n`);
      this.highScore.forEach((player) =>
        console.log(
          `${scoreList++}. ${player.score} (${player.name}) - ${
            player.dateOfScore
          } - ${player.questionCount} Questions`
        )
      );
    }
  }

  clearScores() {
    this.loadHighScore();
    if (this.highScore.length > 0) {
      console.clear();
      console.log(`Cleared ${this.highScore.length} high score(s).`);
      this.highScore = [];
      fs.writeFileSync(
        "./highscore.json",
        JSON.stringify(this.highScore, null, 2)
      );
    } else {
      console.clear();
      console.log("No high scores to clear!");
    }
  }
}

module.exports = {
  Game,
};
