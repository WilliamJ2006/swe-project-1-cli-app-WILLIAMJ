const { ShowMenu } = require('./menu.js')
const showMenu = new ShowMenu();

class App {
    start() {
        console.clear();
        console.log("Welcome!\n");
        showMenu.start();
        console.log("Goodbye!");
    }
}

const app = new App();
app.start();