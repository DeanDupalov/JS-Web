

function factoryUpgrade(car) {

    function getEngin(power) {
        if (power <= 90) {
            return { power: 90, volume: 1800 };
        } else if (power > 90 && power <= 120) {
            return { power: 120, volume: 2400 };
        } else {
            return { power: 200, volume: 3500 };
        }
    }

    function getCarriage(type) {
        if (type === 'hatchback') {
            return { type: 'hatchback', color: car.color }
        } else if (type === 'coupe') {
            return { type: 'coupe', color: car.color }
        }
    }

    function getWheels(wheelsize) {
        if (wheelsize % 2 == 0) {
            wheelsize -= 1
        }
        return [wheelsize,wheelsize,wheelsize,wheelsize];
    }


    return {
        model: car.model,
        engine: getEngin(car.power),
        carriage: getCarriage(car.carriage),
        wheels: getWheels(car.wheelsize)
    }


}

const newCar = factoryUpgrade({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
});
console.log(newCar.wheels);
const newCar2 = factoryUpgrade({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
});

console.log(newCar2.wheels);