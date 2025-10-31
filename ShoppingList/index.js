const { showMenu } = require('./menu.js')

const startApp = () => {
    console.clear();
    console.log("Welcome!\n");
    showMenu();
    console.log("Goodbye!");
}

startApp();