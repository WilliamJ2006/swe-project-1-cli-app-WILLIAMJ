class Questions {
  constructor(question, choices, answerIndex) {
    this.question = question;
    this.choices = choices;
    this.answerIndex = answerIndex;
  }
}

const q1 = new Questions("What is 2+2", ["4", "22", "0", "40"], 0);

const q2 = new Questions("What is 5*6", ["3", "56", "30", "11"], 2);

const q3 = new Questions("What is 6-7", ["12", "-5", "13", "-1"], 3);

const q4 = new Questions("What is 30/3", ["6", "34", "10", "73"], 2);

const q5 = new Questions("What is 12*16", ["32", "192", "0", "67"], 1);

const questions = [q1, q2, q3, q4, q5];

module.exports = {
  questions,
};
