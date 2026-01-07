const { showMenu } = require('./menu.js');

// This is the main entry point for the application.
const startApp = () => {
    console.clear();
    console.log("Welcome to Rock-Paper-Scissors!\n");
    showMenu();
    console.log("Goodbye!");
}

startApp();
