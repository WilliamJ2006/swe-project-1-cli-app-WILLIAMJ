const { showMenu } = require('./menu.js');

const startApp = () => {
    console.clear();
    console.log('Welcome to The Quiz Game!\n')
    showMenu()
    console.log('GoodBye!')
};

startApp();