const {Schema, model, Types: {ObjectId}} = require('mongoose');
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: {
            validator(value){
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid.'
        }

    },
    hashedPassword: {type: String, required: true, minlength: [4, 'Password must be at least 4 characters.']},
    gender: {type: String, required: true},
    tripHistory: {type: [ObjectId], default: [], ref: 'Trip' },

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