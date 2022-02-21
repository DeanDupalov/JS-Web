const {Schema, model,Types: {ObjectId}} = require('mongoose');

const URL_PATTERN = /^http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/(.+)/;

const housingSchema = new Schema({
    homeName: {type: String, minlength: [6, 'Housing name must be at least 6 characters.']},
    type: {type: String,
        required: [true, 'Type field is required. Must be an Apartment, Vila or House'],
        enum: ['apartment', 'villa', 'house']},
    year: {
        type: Number,
        required: true,
        min: [1850, 'House year must be in range 1850 - 2021'],
        max: [2021, 'House year must be in range 1850 - 2021']
    },
    city: {type: String, minlength: [4, 'City name must be at least 4 characters.']},
    image: {
        type: String,
        required: [true, 'Image field is required.'],
        validate: {
            validator(value){
                return URL_PATTERN.test(value)
            },
            message: 'Image must be valid URL.'
        }
    },
    description: {type: String, required: true, maxlength: [60, 'Description must be at most 60 characters.']},
    availablePieces: {
        type: Number,
        required: [true, 'Available Pieces field is required.'],
        min: [0, 'Available Pieces should be in range 1 - 10'],
        max: [10, 'Available Pieces should be in range 1 - 10']
    },
    rented: {type: [ObjectId], default: [], ref: 'User'},
    owner: {type: ObjectId, ref: 'User', required: true },

}, {timestamps: true});


const Housing = model('Housing', housingSchema);

module.exports = Housing;