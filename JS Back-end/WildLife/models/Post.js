const {Schema, model, ObjectId} = require('mongoose');

// TODO change user model according to exam description
const postSchema = new Schema({
    title: {type: String, required: true},
    keyword: {type: String, required: true},
    location: {type: String, required: true},
    dateOfCreation: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    Author: {type: [ObjectId], default: [], ref: 'User'},
    votes: [],
    rating: {type: Number, default: 0}

});

const Post = model('User', postSchema);

module.exports = Post;