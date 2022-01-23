const fs = require('fs/promises');

const filePath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);

    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error('Database write error');
        console.error(err);
        process.exit(1);
    }
}

async function getAll() {
    const data = await read();

    let cars = Object.entries(data)
        .map(([id, value]) => Object.assign({}, {id}, value));

    return cars;
}

async function getCarById(id){
    const data = await read();

    const car = data[id];

    if(car) {
        return Object.assign({}, {id}, car)
    }else {
        return undefined
    }

}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getCarById,
    }
    next()
}