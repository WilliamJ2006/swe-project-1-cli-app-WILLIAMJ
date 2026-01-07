const prompt = require('prompt-sync')({ sigint: true })
const {
    startQuiz,
    viewScores,
    clearScores,
} = require('./game.js')

const showMenu = () => {
    let isRunning = true;
    while (isRunning) {
        console.log('1. Start Quiz');
        console.log('2. View High Score');
        console.log('3. Clear Scores');
        console.log('4. Exit\n');

        const action = prompt('Choose an Action (Enter 1-4): ').trim()
        if (action === '1') {
            console.clear()
            startQuiz();
        } else if (action === '2') {
            console.clear()
            viewScores();
        } else if (action === '3') {
            clearScores();
        } else if (action === '4') {
            console.clear()
            isRunning = false;
        } else {
            console.log('Invalid Option, Please Try Again!');
        }
        prompt('\nPress Enter to Continue...');
        console.clear();
    }
}

module.exports = {
    showMenu,
}