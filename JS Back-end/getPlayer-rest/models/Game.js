const {Schema, model, Types: {ObjectId}} = require('mongoose');

const gameSchema = new Schema({
    name: {
        type: String,
        minlength:[4, 'Name must be at least 4 characters.']
    },
    members: {
        type: Number,
        required: [true, 'Members field is required.'],
        default: 5,
        minlength: [0, 'Members can not be negative number.'],
        maxlength: [11, 'Max 11 Members.']
    },
    town: {
        type: String,
        minlength:[4, 'Town must be at least 4 characters.']
    },
    address: {
        type: String,
        minlength:[4, 'Address must be at least 4 characters.']
    },
    
    description: {
        type: String,
        minlength:[5, 'Description must be at least 5 characters.']
    },
    date: {type: String, required: [true, 'Date is Required.']},
    startTime: {type: String, required: [true, 'Start Time is Required.']},
    endTime: {type: String, required: [true, 'End Time is Required.']},
    creator: {type: ObjectId, ref: 'User', required: true},

});

const Game = model('Game', gameSchema);

module.exports = Game;
