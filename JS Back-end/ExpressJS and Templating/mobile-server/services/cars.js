const Car = require("../models/Car");
const Accessory = require("../models/Accessory");
const {carViewModel} = require("./utils");



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

    const car = await Car.findById(id).populate('accessories');
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
   // минава през ограничени валидатори
   // await Car.findByIdAndUpdate(id, car, {runValidators: true});

   const existing = await Car.findById(id);

   existing.name = car.name;
   existing.description = car.description;
   existing.imageUrl = car.imageUrl;
   existing.price = car.price;
   existing.accessories = car.accessories;

   await existing.save();
}

async function deleteById(id) {
    await Car.findByIdAndDelete(id);
}

async function attachAccessory(carId ,accessoryId) {
    const existing = await Car.findById(carId);
    existing.accessories.push(accessoryId);
    await existing.save();
}


module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getCarById,
        createCar,
        deleteById,
        updateById,
        attachAccessory,
    }
    next()
}