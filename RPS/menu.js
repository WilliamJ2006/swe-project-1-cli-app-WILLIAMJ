const prompt = require('prompt-sync')({ sigint: true });
const {
    play,
    viewStats,
} = require('./game.js');

const showMenu = () => {
    let isRunning = true;

    while (isRunning) {
        console.log('Menu:');
        console.log('1. Play Round');
        console.log('2. View Stats');
        console.log('3. Exit Program\n');

        const menuChoice = prompt('Pick an option between 1-3: ').trim();
        if (menuChoice === '1') {
            console.clear();
            console.log('1. Rock');
            console.log('2. Paper');
            console.log('3. Scissors');
            console.log('4. Exit Game\n');
            const choice = prompt('Choose an option: ');
            if (choice === '1' || choice === '2' || choice === '3') {
                play(choice);
            } else if (choice === '4') {
                console.clear();
                showMenu();
            } else {
                console.log('Invalid option, try again.');
            }
        } else if (menuChoice === '2') {
            viewStats();
        } else if (menuChoice === '3') {
            isRunning = false;
        } else {
            console.log('Invalid option, try again.');
        }
        prompt('\nPress Enter to Continue...');
        console.clear();
    }
};

module.exports = {
    showMenu,
};