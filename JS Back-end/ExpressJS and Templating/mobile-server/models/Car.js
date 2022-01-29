const {Schema, model} = require('mongoose');


const carSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {type: String},
    imageUrl: {type: String},
    price: {
        type: Number,
        min: [1, 'Price must be at least $1, now is {VALUE}'],
    },
});
const Car = model('Car', carSchema)
module.exports = Car;
