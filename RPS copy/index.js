const { ShowMenu } = require('./menu.js');

// This is the main entry point for the application.
const menu = new ShowMenu();
 class App {
    constructor(name) {
        this.name = name;
    }

    start(){
        console.clear();
        console.log("Welcome to Rock-Paper-Scissors!\n");
        menu.start();
        console.log("Goodbye!");
    }
}

const rps = new App(`rps`);
rps.start();
