function solution() {
    const recipes = {
        'apple': {
            'carbohydrate': 1,
            'flavour': 2,
        },
        'lemonade': {
            'carbohydrate': 10,
            'flavour': 20,
        },
        'burger': {
            'carbohydrate': 5,
            'fat': 7,
            'flavour': 3,
        },
        'eggs': {
            'protein': 5,
            'fat': 1,
            'flavour': 1,
        },
        'turkey': {
            'protein': 10,
            'carbohydrate': 10,
            'fat': 10,
            'flavour': 10,
        },
    }
    const stock = {
        'protein': 0,
        'carbohydrate': 0,
        'fat': 0,
        'flavour': 0,
    }

    function manager(args) {
        const data = args.split(' ');
        const command = data[0];
        if (command === 'report') {
            return `protein=${stock['protein']} carbohydrate=${stock['carbohydrate']} fat=${stock.fat} flavour=${stock['flavour']}`
        }
        const item = data[1];
        const quantity = Number(data[2])

        const handler = {
            'prepare': prepare,
            'restock': restock,
        }

        function prepare(product, count) {
            const recipe = recipes[product];

            for (let ingredient in recipe) {
                if (recipe[ingredient] * count > stock[ingredient]) {
                    return `Error: not enough ${ingredient} in stock`;
                }
            }
            for (let ingredient in recipe) {
                stock[ingredient] -= recipe[ingredient] * count;
            }
            return 'Success';
        }

        function restock(product, count) {
            stock[product] += count;
            return 'Success';
        }

        return handler[command](item, quantity);
    }

    return manager;
}


let manager = solution();

// console.log(manager("prepare lemonade 4"));
// console.log(manager("report"));
// console.log(manager("restock flavour 50"));
console.log(manager("restock flavour 50"));
console.log(manager("prepare lemonade 4"));
console.log(manager("restock carbohydrate 10"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare apple 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare burger 1"));
console.log(manager("report"));

// console.log('***********************************************')
// console.log(manager("prepare turkey 1"));
// console.log(manager("restock protein 10"));
// console.log(manager("prepare turkey 1"));
// console.log(manager("restock carbohydrate 10"));
// console.log(manager("prepare turkey 1"));
// console.log(manager("restock fat 10"));
// console.log(manager("prepare turkey 1"));
// console.log(manager("restock flavour 10"));
// console.log(manager("prepare turkey 1"));
// console.log(manager("report"));







