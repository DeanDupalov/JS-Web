const Accessory = require('../models/Accessory');
const {accessoryViewModel} = require("./utils");

async function getAllAccessories() {
    const accessories = await Accessory.find({});
    return accessories.map(accessoryViewModel);
}

async function createAccessory(accessory) {
    await Accessory.create(accessory);
}

module.exports = () => (req, res, next) => {
    req.accessory = {
        getAllAccessories,
        createAccessory,
    }
    next();
}