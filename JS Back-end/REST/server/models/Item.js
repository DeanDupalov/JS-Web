const {Schema, model, Types: {ObjectId}} = require('mongoose');

const itemSchema = new Schema({
    make: {
        type: String,
        minlength:[4, 'Make must be at least 4 characters.']
    },
    model: {
        type: String,
        minlength:[4, 'Model must be at least 4 characters.']
    },
    year: {
        type: Number,
        required: [true, 'Field year is required and, must be between 1950 and  2050.'],
        min: [1950, 'Field year must be between 1950 and 2050.'],
        max: [2050, 'Field year must be between 1950 and 2050.']
    },
    description: {
        type: String,
        minlength:[10, 'Description must be at least 10 characters.']

    },
    price: {
        type: Number,
        required: [true, 'Field Price is required.'],
        min: [0, 'Field Price can not be negative number.']
    },
    img: {type: String, required: [true, 'Field Image is required.']},
    material: {type: String},
    owner: {type: ObjectId, ref: 'User', required: true},

});

const Item = model('Item', itemSchema);

module.exports = Item;
