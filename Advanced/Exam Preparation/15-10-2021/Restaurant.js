class Restaurant {

    constructor(budget) {
        this.budgetMoney = Number(budget);
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        products.forEach(p => {
            const [name, quantityStr, priceStr] = p.split(' ');
            const price = Number(priceStr);
            const quantity = Number(quantityStr);

            if (this.budgetMoney < price * quantity) {
                this.history.push(`There was not enough money to load ${quantity} ${name}`)
            } else {
                if (name in this.stockProducts) {
                    this.stockProducts[name] += quantity;

                } else {
                    this.stockProducts[name] = quantity;

                }
                this.budgetMoney -= price * quantity
                this.history.push(`Successfully loaded ${price} ${name}`)
            }
        })

        return this.history.join('\n')
    }

    addToMenu(meal, neededProducts, price) {


        if (meal in this.menu) {
            return `The ${meal} is already in the our menu, try something different.`
        } else {

            this.menu[meal] = {
                'products': neededProducts,
                'price': Number(price),

            };
            if (Object.entries(this.menu).length === 1) {
                return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`
            } else {
                return `Great idea! Now with the ${meal} we have ${this.menu.length} meals in the menu, other ideas?`
            }
        }
    }

    showTheMenu() {

        if (Object.entries(this.menu).length === 0) {
            return "Our menu is not ready yet, please come later..."
        } else {
            let result = []
            for (const meal in this.menu) {
                result.push(`${meal} - $ ${this.menu[meal]['price']}`)
            }
            return result.join('\n');
        }
    }

    makeTheOrder(meal) {
        if (meal in this.menu) {
            const neededProducts = this.menu[meal]['products'];

            for (const data of neededProducts) {
                const tokens = data.split(' ');
                const product = tokens[0]
                const quantity = Number(tokens[1])
                if (this.stockProducts[product] === undefined || quantity > this.stockProducts[product]) {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
                }
            }
        } else {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }
    }
}

let kitchen = new Restaurant(1000);
// console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
// let kitchen = new Restaurant(1000);
// console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
// console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
//


kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);


kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 100000', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
console.log(kitchen.makeTheOrder('frozenYogurt'));
