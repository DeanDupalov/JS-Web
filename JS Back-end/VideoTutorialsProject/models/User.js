const {Schema, model, Types: {ObjectId}} = require('mongoose');

// PATTERN = /^[a-zA-Z0-9]*$/;
const PATTERN = /^[a-zA-Z0-9]+$/;

const userSchema = new Schema({
    username: {
        type: String,
        minlength: [5, 'The username should be at least 5 characters long and should consist only english letters and digits'],
        validate: {
            validator(value) {
                return PATTERN.test(value);
            },
            message: 'Username must be in the right format. Only english letters and digits '
        }
    },
    hashedPassword: {
        type: String,
        minlength: [5, 'The password should be at least 5 characters long and should consist only english letters and digits'],

    },
    courses: {type: [ObjectId], default: [], ref: 'Course'}
});



userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User;