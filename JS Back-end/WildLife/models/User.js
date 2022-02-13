const {Schema, model,ObjectId} = require('mongoose');


const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    hashedPassword: {type: String, required: true},
    myPost: {type: [ObjectId], default: [], ref: 'Post'}
});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User