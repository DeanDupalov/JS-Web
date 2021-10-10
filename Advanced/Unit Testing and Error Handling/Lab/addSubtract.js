function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}

const calculator = createCalculator();
let value = calculator.get();
value += 10;
console.log(calculator.get())


module.exports = {
    createCalculator,
}