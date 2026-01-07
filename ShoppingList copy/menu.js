const prompt = require('prompt-sync')({ sigint: true })
const {
   shoppingCart,
} = require('./shoppingCart.js');

class ShowMenu {
    constructor() {
        this.isRunning = true;
    }
    start() {
        while (this.isRunning) {
            console.log('1. Add Item');
            console.log('2. Remove Item');
            console.log('3. View item');
            console.log('4. Exit\n');

            const action = prompt('Choose an Action (Enter 1-4): ').trim();
            if (action === '1') {
                console.clear();
                shoppingCart.addItem();
            } else if (action === '2') {
                console.clear();
                shoppingCart.removeItem();
            } else if (action === '3') {
                console.clear();
                shoppingCart.viewList();
            } else if (action === '4') {
                console.clear();
                this.isRunning = false;
            } else {
                console.log('Invalid Input!')
            }
            prompt('\nPress Enter to Continue...');
            console.clear();
        }
    }
};

module.exports = {
    ShowMenu,
}