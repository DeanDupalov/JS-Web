class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
    }

    loadingVegetables(vegetables) {
        let names = new Set();


        vegetables.forEach((v) => {

            let [type, quantityStr, priceStr] = v.split(' ');
            let quantity = Number(quantityStr);
            let price = Number(priceStr);
            let vegetable = {
                type,
                quantity,
                price,
            }
            names.add(type);

            let product = this.availableProducts.find((p) => p.type === type);

            if (product === undefined) {
                this.availableProducts.push(vegetable);
            } else {
                product.quantity += quantity;

                if (price > product.price) {
                    product.price = price;
                }
            }

        })

        return `Successfully added ${Array.from(names).join(', ')}`
    }

    buyingVegetables(selectedProducts) {
        let total = 0;

        selectedProducts.forEach((p) => {
            let [type, quantityStr] = p.split(' ');
            let quantity = Number(quantityStr);

            let product = this.availableProducts.find((p) => p.type === type);
            if (product === undefined) {
                throw Error(`${type} is not available in the store, your current bill is $${total.toFixed(2)}.`)
            } else {
                if(quantity > product.quantity){
                    throw Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${total.toFixed(2)}.`)
                }
            }

            let currentPrice = quantity * product.price;
            total += currentPrice;
            product.quantity -= quantity;

        })
        return `Great choice! You must pay the following amount $${total.toFixed(2)}.`
    }

    rottingVegetable(type, quantity) {
        let product = this.availableProducts.find((p) => p.type === type);
        if(product === undefined) {
            throw Error(`${type} is not available in the store.`)
        } else if(quantity > product.quantity){
            product.quantity = 0;
            return `The entire quantity of the ${type} has been removed.`
        }else{
            product.quantity -= quantity;
            return `Some quantity of the ${type} has been removed.`
        }
    }

    revision() {
        let result = ['Available vegetables:'];
        this.availableProducts
            .sort((a, b) => a.price - b.price)
            .forEach((p) => result.push(`${p.type}-${p.quantity}-$${p.price}`))
        result.push(`The owner of the store is ${this.owner}, and the location is ${this.location}.`);

        return result.join('\n');
    }
}

let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
// console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.0", "Beans 10 2.9"]));
// console.log(vegStore.availableProducts)


// console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
// console.log(vegStore.buyingVegetables(["Okra 1"]));
// console.log(vegStore.buyingVegetables(["Beans 8", "Okra 1.5"]));
// vegStore.buyingVegetables(["Banana 1", "Beans 2"])


// console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
// console.log(vegStore.rottingVegetable("Okra", 1));
// console.log(vegStore.rottingVegetable("Okra", 2.5));
// console.log(vegStore.buyingVegetables(["Beans 8", "Okra 1.5"]));



console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
console.log(vegStore.rottingVegetable("Okra", 1));
console.log(vegStore.rottingVegetable("Okra", 2.5));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());
