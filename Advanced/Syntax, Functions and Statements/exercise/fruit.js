function solve(fruitName, weightGrams, priceKg) {
    let weightKg = weightGrams / 1000;
    let total =weightKg * priceKg;

    return `I need $${total.toFixed(2)} to buy ${weightKg.toFixed(2)} kilograms ${fruitName}.`
}


console.log(solve('orange', 2500, 1.80));
console.log(solve('apple', 1563, 2.35));