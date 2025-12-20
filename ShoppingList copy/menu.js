const prompt = require('prompt-sync')({ sigint: true })
const {
    addItem,
    removeItem,
    viewList,
} = require('./actions.js');

const showMenu = () => {
    let isRunning = true;
    while (isRunning) {
        console.log('1. Add Item');
        console.log('2. Remove Item');
        console.log('3. View item');
        console.log('4. Exit\n');

        const action = prompt('Choose an Action (Enter 1-4): ').trim();
        if (action === '1') {
            console.clear();
            addItem();
        } else if (action === '2') {
            console.clear();
            removeItem();
        } else if (action === '3') {
            console.clear();
            viewList();
        } else if (action === '4') {
            console.clear();
            isRunning = false;
        } else {
            console.log('Invalid Input!')
        }
        prompt('\nPress Enter to Continue...');
        console.clear();
    }
};

module.exports = {
    showMenu,
}