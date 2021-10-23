class ChristmasDinner {

    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guest = {};
    }

    get budget() {
        return this._budget
    }

    set budget(value) {
        if (value < 0) {
            throw Error('The budget cannot be a negative number')
        }
        this._budget = value;
    }

    shopping(productArr) {
        const [type, price] = productArr;

        if (this.budget < price) {
            throw Error('Not enough money to buy this product');
        }
        this.products.push(type);
        this._budget -= price;
        return `You have successfully bought ${type}!`

    }

    recipes(recipeObj) {   // { recipeName: string, productsList: array of strings }.
        const neededProducts = recipeObj.productsList;
        let inStock = neededProducts.every((product) => this.products.includes(product));

        if (inStock === false) {
            throw Error("We do not have this product")
        }

        this.dishes.push(recipeObj);
        return `${recipeObj.recipeName} has been successfully cooked!`

    }

    inviteGuests(name, dish) {
        let haveDish = this.dishes.some((d) => d.recipeName === dish);
        if (haveDish === false) {
            throw Error('We do not have this dish')
        }
        let isPresent = Object.keys(this.guest).some((n) => n === name);

        if (isPresent === true) {
            throw Error(`This guest has already been invited`)
        }
        this.guest[name] = dish;
        return `You have successfully invited ${name}!`
    }

    showAttendance() {
        //"{name} will eat {dish}, which consists of {products}
        let result = [];
        for (const guestName in this.guest) {
            const products = this.dishes.find((dish) => this.guest[guestName] === dish.recipeName)
            result.push(`${guestName} will eat ${this.guest[guestName]}, which consists of ${products.productsList.join(', ')}`)
        }
        return result.join('\n')
    }
}

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());


