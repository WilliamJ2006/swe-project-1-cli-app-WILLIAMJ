class Questions {
  choices = [];
  operations = ["*", "/", "+", "-"];
  constructor() {
    this.question = "";
    this.answerIndex = null;
  }
  randQ() {
    const set = new Set();
    this.answerIndex = Math.floor(Math.random() * 4);
    const randOp = Math.floor(Math.random() * 4);
    const rand1 = Math.floor(Math.random() * 30) + 1;
    let rand2 = Math.floor(Math.random() * 31);
    switch (this.operations[randOp]) {
      case "+":
        this.choices[this.answerIndex] = Math.floor(rand1 + rand2);
        break;
      case "-":
        this.choices[this.answerIndex] = Math.floor(rand1 - rand2);
        break;
      case "*":
        this.choices[this.answerIndex] = Math.floor(rand1 * rand2);
        break;
      case "/":
        if (rand2 > rand1) {
          rand2 = Math.floor(Math.random() * (rand1 - 1) + 1);
        }
        this.choices[this.answerIndex] = Math.floor(rand1 / rand2);
        break;
    }
    set.add(this.choices[this.answerIndex]);
    for (let i = 0; i < 4; i++) {
      if (i != this.answerIndex) {
        let randSol =
          Math.floor(
            Math.random() * (this.choices[this.answerIndex] * 2 + 15)
          ) - this.choices[this.answerIndex];
        while (set.has(randSol)) {
          randSol =
            Math.floor(
              Math.random() * (this.choices[this.answerIndex] * 2 + 15)
            ) - this.choices[this.answerIndex];
        }
        this.choices[i] = randSol;
        set.add(randSol);
      }
    }
    this.question = `What is ${rand1}${this.operations[randOp]}${rand2}`;
  }
}

module.exports = {
  Questions,
};
