const {Schema, model, Types: {ObjectId}} = require('mongoose');
const URL_PATTERN = /^http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/(.+)/;

const tripSchema = new Schema({
    startPoint: {
        type: String,
        minlength: [4, 'Start point must be at least 4 characters long'],
    },
    endPoint: {
        type: String,
        minlength: [4, 'End point must be at least 4 characters long']
    },
    date: {type: String, required: [true, 'Date is Required.']},
    time: {type: String, required: [true, 'Time is Required.']},
    carImage: {
        type: String,
        required: [true, 'Image field is required.'],
        validate: {
            validator(value){
                return URL_PATTERN.test(value)
            },
            message: 'Image must be valid URL.'
        }
    },
    carBrand: {
        type: String,
        minlength: [3, 'Car must be at least 3 characters long']
    },
    seats: {
        type: Number,
        required: [true, 'Seats field is required.'],
        default: 3,
        minlength: [0, 'Seats can not be negative number.'],
        maxlength: [4, 'Max 4 seats.']
    },
    price: {type: Number, min: 1, max: 50, default: 0},
    description: {
        type: String,
        minlength: [10, 'Description must be at least 10 characters long']
    },
    creator: {type: ObjectId, ref: 'User', required: true },
    bodies: {type: [ObjectId], default: [], ref: 'User' },

});


const Trip = model('Trip', tripSchema);

module.exports = Trip;