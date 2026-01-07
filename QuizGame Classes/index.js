const { ShowMenu } = require("./menu.js");
const showMenu = new ShowMenu();

class App {
  start() {
    console.clear();
    console.log("Welcome to The Quiz Game!\n");
    showMenu.start();
    console.log("GoodBye!");
  }
}

const app = new App();

app.start();
