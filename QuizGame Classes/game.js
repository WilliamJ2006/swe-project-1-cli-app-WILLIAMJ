const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const { questions } = require("./questions");

class Game {
  highScore = [];

  addHighScore(playerScore) {
    this.loadHighScore();
    this.highScore.unshift(playerScore);
    this.highScore.sort((a, b) => b.score - a.score);
    this.highScore = this.highScore.slice(0, 5);
    fs.writeFileSync(
      "./highscore.json",
      JSON.stringify(this.highScore, null, 2)
    );
  }

  loadHighScore() {
    if (!fs.existsSync("./highscore.json")) {
      fs.writeFileSync("./highscore.json", JSON.stringify([], null, 2));
      this.highScore = [];
    } else {
      let scores = fs.readFileSync("./highscore.json", "utf-8");
      this.highScore = JSON.parse(scores);
      this.highScore = this.highScore.slice(0, 5);
    }
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const copy = arr[i];
      [arr[i], arr[j]] = [arr[j], copy];
    }
  }

  startQuiz() {
    this.loadHighScore();
    const score = { correct: 0, total: 0 };
    const finalScore = {};
    let indexOfDoneQ = [];
    let questionNum = 0;
    let questionRunning = true;
    let randomQ = Math.floor(Math.random() * questions.length);
    while (questionRunning) {
      const question = questions[randomQ];
      const correctAnswer = question.choices[question.answerIndex];
      console.log(`Question ${++questionNum}`);
      console.log(`\n${question.question}?`);
      this.shuffle(question.choices);
      question.answerIndex = question.choices.indexOf(correctAnswer);
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
      indexOfDoneQ.push(randomQ);
      if (indexOfDoneQ.length !== questions.length) {
        while (indexOfDoneQ.includes(randomQ)) {
          randomQ = Math.floor(Math.random() * questions.length);
        }
      } else {
        console.log(`\nThanks for playing!`);
        questionRunning = false;
      }
    }
    if (
      this.highScore.find(
        (player) =>
          player.score <= Math.round((score.correct / score.total) * 100)
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
          }`
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
