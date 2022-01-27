const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/testdb';

const Car = require('./models/Car')

start()

async function start() {

    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log('Database connected');


    // await Car.create({
    //     name: 'KIA Seed',
    //     year: 2013,
    //     price: 9000
    // });
    const data = await Car.find({}).select('name')
    console.log(data)
}