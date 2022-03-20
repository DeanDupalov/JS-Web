const Game = require('../models/Game');

async function getAll() {
    return Game.find({})
}

async function create(game) {
    const result = new Item(game);

    await result.save();
    return result;
}

function getById(id) {
    return Game.findById(id);
}

async function update(id, game) {

    const existing = await Game.findById(id);

    existing.name = game.name
    existing.members = game.members
    existing.town = game.town
    existing.address = game.address
    existing.description = game.description
    existing.date = game.date
    existing.startTime = game.startTime
    existing.endTime = game.endTime

    await existing.save()
    return existing;
}

async function deleteById(id) {
    await Game.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById
}