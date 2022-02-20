const {Schema, model,Types: {ObjectId}} = require('mongoose');



const housingSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true, enum: ['Apartment', 'Vila', 'House']},
    year: {type: Number, required: true},
    city: {type: String, required: true},
    description: {type: String, required: true},
    availablePieces: {type: Number, required: true},
    rented: {type: [ObjectId], default: [], ref: 'User'},
    owner: {type: ObjectId, ref: 'User', required: true }
});




const Housing = model('Housing', housingSchema);

module.exports = Housing;