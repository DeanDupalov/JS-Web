const {Schema, model, Types: {ObjectId}} = require('mongoose');


const carSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: 'No Image'
    },
    price: {
        type: Number,
        min: [1, 'Price must be at least $1, now is {VALUE}'],
        required: true
    },
    accessories: {
        type: [ObjectId],
        default: [],
        ref: 'Accessory',
    }
});
const Car = model('Car', carSchema)
module.exports = Car;
