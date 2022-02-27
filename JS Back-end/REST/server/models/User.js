const {Schema, model} = require('mongoose');

// TODO change user model according to exam description
const userSchema = new Schema({
    email: {type: String, required: true},
    hashedPassword: {type: String, required: true},
});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User;