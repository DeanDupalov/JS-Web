const Car = require("../models/Car");

function carViewModel(car) {
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price
    };
}

async function getAll(query) {
    const options = {};
    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = {$gte: Number(query.from)}
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price = {$lte: Number(query.to)};
    }

    const cars = await Car.find(options);
    return cars.map(carViewModel);
}

async function getCarById(id) {

    const car = await Car.findById(id);
    if (car) {
        return carViewModel(car);
    } else {
        return undefined;
    }
}

async function createCar(car) {
    await Car.create(car);
}

async function updateById(id, car) {
   await Car.findByIdAndUpdate(id, car);
}

async function deleteById(id) {
    await Car.findByIdAndDelete(id);
}


module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getCarById,
        createCar,
        deleteById,
        updateById,
    }
    next()
}