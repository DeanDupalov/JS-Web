const Housing = require("../models/Housing");

async function getAllHouses() {
    const houses = await Housing.find({}).lean();

    return houses;
}

async function getLastThree() {
    const houses = await Housing.find({}).sort({createdAt: -1}).limit(3).lean();

    return houses;
}


async function getHousesByType(type) {
    const houses = await Housing.find({type}).lean();

    return houses;
}
async function getHouseById(id) {
    return Housing.findById(id)
        .populate('owner', 'username')
        .populate('rented', 'name username')
        .lean();
}

async function createHouse(house) {
    const result = new Housing(house);
    await result.save();

    return result;
}

async function rentHouse(userId, houseId) {
    const house = await Housing.findById(houseId);

    if (house.availablePieces.length == 0) {
        throw new Error('No availability.')
    }

    if (house.rented.includes(userId)) {
        throw new Error('User is already booked a house.')
    }
    house.rented.push(userId);
    house.availablePieces -= 1

    await house.save();
}

async function updateHouse(id, house) {
    const existing = await Housing.findById(id);

    existing.homeName = house.homeName.trim();
    existing.type = house.type.trim().toLowerCase();
    existing.year = house.year.trim();
    existing.city = house.city.trim();
    existing.image = house.image.trim();
    existing.description = house.description.trim();
    existing.availablePieces = house.availablePieces.trim();

    await existing.save()
}

async function deleteHouseById(id) {
    return Housing.findByIdAndDelete(id)
}
module.exports = {
    getAllHouses,
    createHouse,
    getLastThree,
    getHouseById,
    rentHouse,
    updateHouse,
    deleteHouseById,
    getHousesByType
}