const prompt = require('prompt-sync')({ sigint: true })
let shoppingCart = []

const addItem = () => {
    let running = true;
    let name = prompt('Enter item name: ');
    while (!name.match(/^[a-zA-Z]+$/)) {
        console.clear();
        console.log('Invalid!');
        name = prompt('Enter item name: ');
    }
    name = name.toLowerCase();
    while (shoppingCart.find((item) => item.name === name)) {
        console.log('Already exists in cart!')
        let choice = prompt(`Do you want to add to ${name}? (Y/N): `)
        while (choice.toLowerCase() != 'y' && choice.toLowerCase() != 'n') {
            console.clear();
            console.log('Invalid!');
            choice = prompt(`Do you want to add to ${name}? (Y/N): `)
        }
        if (choice.toLowerCase() === 'y') {
            running = false;
            break;
        } else if (choice.toLowerCase() === 'n') {
            name = prompt('Enter item name: ');
            while (!name.match(/^[a-zA-Z]+$/)) {
                console.clear();
                console.log('Invalid!');
                name = prompt('Enter item name: ');
            }
        }
    }
    let quantity = Number(prompt('Enter quantity: '));
    while (Number.isNaN(quantity) || quantity <= 0 || quantity !== Math.floor(quantity)) {
        console.clear();
        console.log('Invalid!');
        quantity = Number(prompt('Enter quantity: '));
    }
    let price;
    if (running) {
        price = Number(prompt('Enter price per item: '));
        while (Number.isNaN(price) || price <= 0) {
            console.clear();
            console.log('Invalid!')
            price = Number(prompt('Enter price per item: '));
        }
        shoppingCart.push({ name: name, quantity: quantity, price: price });
    } else {
        shoppingCart.forEach((item) => {
            if (item.name === name) {
                item.quantity += quantity;
                price = item.price;
            }
        })
    }
    console.log(`Added ${quantity} ${name} at $${price.toFixed(2)} each to your shopping list!`);
}

const removeItem = () => {
    let name = prompt('Enter item name to remove (Enter -1 to Check List!): ');
    while (name === '-1') {
        console.clear();
        viewList();
        console.log('')
        name = prompt('Enter item name (Enter -1 to Check List!): ');
    }
    while (!name.match(/^[a-zA-Z]+$/)) {
        console.clear();
        console.log('Invalid!')
        name = prompt('Enter item name (Enter -1 to Check List!): ')
    }
    name = name.toLowerCase();
    while (!shoppingCart.find(item => item.name === name)) {
        console.clear();
        console.log('Not in cart!')
        name = prompt('Enter item name (Enter -1 to Check List!): ');
    }
    let quantity = Number(prompt('Enter quantity to remove (Enter -1 to Check List!): '));
    while (quantity === -1) {
        console.clear();
        viewList();
        console.log(``);
        quantity = Number(prompt('Enter quantity to remove (Enter -1 to Check List!): '));
    }
    while (Number.isNaN(quantity) || quantity <= 0 || quantity !== Math.floor(quantity)) {
        console.clear();
        console.log('Invalid!');
        quantity = Number(prompt('Enter quantity to remove (Enter -1 to Check List!): '));
    }
    shoppingCart.forEach((item) => {
        if (item.name === name) {
            while (quantity > item.quantity) {
                console.log(`There's only ${item.quantity} ${item.name} in the cart!`);
                quantity = Number(prompt('Enter quantity to remove (Enter -1 to Check List!): '));
                while (quantity === -1) {
                    console.clear();
                    viewList();
                    console.log(``);
                    quantity = Number(prompt('Enter quantity to remove (Enter -1 to Check List!): '));
                }
                while (Number.isNaN(quantity) || quantity <= 0 || quantity !== Math.floor(quantity)) {
                    console.clear();
                    console.log('Invalid!');
                    quantity = Number(prompt('Enter quantity to remove (Enter -1 to Check List!): '));
                }
            }
            item.quantity -= quantity;
        }
    })
    shoppingCart = shoppingCart.filter(item => item.quantity > 0);
    console.log(`Removed ${quantity} ${name} from your shopping list!`)
}

const viewList = () => {
    if (shoppingCart.length > 0) {
        console.log('Your Shopping List: ')
        shoppingCart.forEach((item) => console.log(`- ${item.quantity} ${item.name}: $${(item.quantity * item.price).toFixed(2)}`));
        console.log(`\nTotal Items: ${shoppingCart.reduce((acc, curr) => acc + curr.quantity, 0)}`)
        console.log(`Total Price: $${shoppingCart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0).toFixed(2)}`)
    } else {
        console.log('No Items in Shopping Cart!');
    }
}

module.exports = {
    addItem,
    removeItem,
    viewList,
}