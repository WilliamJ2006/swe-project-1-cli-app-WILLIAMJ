const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
let highScore = [];
const questions = [
    {
        question: "What is 2+2",
        choices: ["4", "22", "0", "40"],
        answerIndex: 0
    },
    {
        question: "What is 5*6",
        choices: ["3", "56", "30", "11"],
        answerIndex: 2
    },
    {
        question: "What is 6-7",
        choices: ["12", "-5", "13", "-1"],
        answerIndex: 3
    },
    {
        question: "What is 30/3",
        choices: ["6", "34", "10", "73"],
        answerIndex: 2
    },
    {
        question: "What is 12*16",
        choices: ["32", "192", "0", "67"],
        answerIndex: 1
    },
]

const addHighScore = (playerScore) => {
    loadHighScore();
    highScore.unshift(playerScore);
    highScore.sort((a, b) => b.score - a.score);
    highScore = highScore.slice(0, 5);
    fs.writeFileSync('./highscore.json', JSON.stringify(highScore, null, 2))
}

const loadHighScore = () => {
    let scores = fs.readFileSync('./highscore.json', 'utf-8')
    if (scores.length > 0) {
        highScore = JSON.parse(scores);
        highScore = highScore.slice(0, 5);
    }
};

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const copy = arr[i];
        [arr[i], arr[j]] = [arr[j], copy];
    }
};

const startQuiz = () => {
    loadHighScore();
    const score = { correct: 0, total: 0 }
    const finalScore = {};
    let indexOfDoneQ = [];
    let questionNum = 0;
    let questionRunning = true;
    let randomQ = Math.floor(Math.random() * questions.length);
    while (questionRunning) {
        const question = questions[randomQ]
        const correctAnswer = question.choices[question.answerIndex];
        console.log(`Question ${++questionNum}`)
        console.log(`\n${question.question}?`)
        shuffle(question.choices);
        question.answerIndex = question.choices.indexOf(correctAnswer);
        question.choices.forEach((answer, index) => console.log(`${index + 1}. ${answer}`));
        let choice = Number(prompt('Enter your answer (1-4): '));
        while (!(choice < 5 && choice > 0) || choice !== Math.floor(choice)) {
            console.log('\nInvalid! Please try again.')
            choice = Number(prompt('Enter your answer (1-4): '));
        }
        if (choice - 1 === question.answerIndex) {
            console.clear();
            console.log('\nCorrect! Well done!');
            score.correct++;
            score.total++
        } else {
            console.clear();
            console.log('Incorrect! Sorry!');
            score.total++;
        }
        console.log(`Current Score: ${score.correct}/${score.total} (${Math.round(score.correct / score.total * 100)}%)\n`)
        indexOfDoneQ.push(randomQ);
        if (indexOfDoneQ.length !== questions.length) {
            while (indexOfDoneQ.includes(randomQ)) {
                randomQ = Math.floor(Math.random() * questions.length);
            }
        } else {
            console.log(`\nThanks for playing!`)
            questionRunning = false;
        }
    }
    if (highScore.find((player) => player.score <= Math.round(score.correct / score.total * 100)) || highScore.length < 5) {
        console.log('Congratulations! You scored a high score!')
        let name = prompt('Enter your name: ')
        while (!name.match(/^[a-zA-z]+$/)) {
            console.log('\nInvalid! Please try again.');
            name = prompt('Enter your name: ');
        }
        finalScore.name = name;
        finalScore.score = Math.round(score.correct / score.total * 100);
        let date = new Date();
        finalScore.dateOfScore = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(2)}`;
        addHighScore(finalScore);
    }
};

const viewScores = () => {
    loadHighScore();
    if (highScore.length === 0) {
        console.log('No high scores yet!')
    } else {
        highScore.forEach((player) => console.log(`${player.score} (${player.name}) - ${player.dateOfScore}`))
    }
};

const clearScores = () => {
    loadHighScore();
    if (highScore.length > 0) {
        console.log(`Cleared ${highScore.length} high score(s).`)
        highScore = [];
        fs.writeFileSync('./highscore.json', JSON.stringify(highScore, null, 2));
    } else {
        console.clear();
        viewScores();
    }
}

module.exports = {
    startQuiz,
    viewScores,
    clearScores,
}