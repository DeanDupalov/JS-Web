const {Schema, model, Types: {ObjectId}} = require('mongoose');


const carSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Listing name is required'],
        minlength: [3, 'Car listing name must be at least 3 characters long.']
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
        required: [true, 'Price is required']
    },
    accessories: {
        type: [ObjectId],
        default: [],
        ref: 'Accessory',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: ObjectId,
        ref: 'User',
    }
});


const Car = model('Car', carSchema)
module.exports = Car;
