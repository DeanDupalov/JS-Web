function findLowestPrice(infoString) {
    const products = {};

    for (let data of infoString) {
        let [town, product, price] = data.split(' | ');
        price = Number(price);

        if (!products[product]) {
            products[product] = {};

            products[product]['townName'] = town;
            products[product]['price'] = price;
        } else {

            if (products[product]['price'] > price) {
                products[product]['price'] = price;
                products[product]['townName'] = town;
            }
        }
    }
    for (let key in products){
        let result = `${key} -> ${products[key].price} (${products[key].townName})`
        // console.log(key, products[key].townName)
        console.log(result)
    }
    
}
// findLowestPrice(
//     [
//         'Sample Town | Sample Product | 1000',
//         'Sample Town | Orange | 2',
//         'Sample Town | Peach | 1',
//         'Sofia | Orange | 3',
//         'Sofia | Peach | 2',
//         'New York | Sample Product | 1000.1',
//         'New York | Burger | 10'


//     ]

// );
findLowestPrice(
    [
        'Sofia City | Audi | 100000',
        'Sofia City | BMW | 100000',
        'Sofia City | Mitsubishi | 10000',
        'Sofia City | Mercedes | 10000',
        'Sofia City | NoOffenseToCarLovers | 0',
        'Mexico City | Audi | 1000',
        'Mexico City | BMW | 99999',
        'New York City | Mitsubishi | 10000',
        'New York City | Mitsubishi | 1000',
        'Mexico City | Audi | 100000',
        'Washington City | Mercedes | 1000',
        ]
)