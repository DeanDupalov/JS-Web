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

            if (this.budgetMoney < price) {
                this.history.push(`There was not enough money to load ${quantity} ${name}`)
            } else {
                if (name in this.stockProducts) {
                    this.stockProducts[name] += quantity;

                } else {
                    this.stockProducts[name] = quantity;

                }
                this.budgetMoney -= price;
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
                'products': {},
                'price': Number(price),

            };
            neededProducts.forEach(pair => {
                const [product, quantity] = pair.split(' ')
                if (product in this.menu[meal]['products']){
                    this.menu[meal]['products'][product] += Number(quantity);
                }else{
                    this.menu[meal]['products'][product] = Number(quantity);
                }

            });

            if (Object.entries(this.menu).length === 1) {
                return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`
            } else {
                return `Great idea! Now with the ${meal} we have ${Object.entries(this.menu).length} meals in the menu, other ideas?`
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
            const neededProductsObj = this.menu[meal]['products'];

            for (const product in neededProductsObj) {
                if (this.stockProducts[product] === undefined || neededProductsObj[product] > this.stockProducts[product]) {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
                }
            }
            for (const product in neededProductsObj){
                this.stockProducts[product] -= neededProductsObj[product];
            }
            this.budgetMoney += this.menu[meal]['price'];
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal]['price']}.`
        } else {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }
    }
}

let test = new Restaurant(1000);

console.log(test.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(test.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
// expect(res).to.equal("Great idea! Now with the Pizza we have 2 meals in the menu, other ideas?");