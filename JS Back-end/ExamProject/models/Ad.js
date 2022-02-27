const {Schema, model, Types: {ObjectId}} = require('mongoose');


const adSchema = new Schema({
    headline: {type: String, minlength: [4, 'The Headline should be a minimum of 4 characters long.']},
    location: {type: String, minlength: [8, 'The Location should be a minimum of 8 characters long.']},
    companyName: {type: String, minlength: [3, 'The Company Name should be a minimum of 3 characters long.']},
    description: {type: String, maxlength: [40, 'The Company Description should be a maximum of 40 characters long.']},
    author: {type: ObjectId, required: true, ref: 'User'},
    usersApplied: {type: [ObjectId], default: [], ref: 'User'}

}, {timestamps: true});


const Ad = model('Ad', adSchema);

module.exports = Ad;