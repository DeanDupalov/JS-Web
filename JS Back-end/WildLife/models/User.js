const {Schema, model,ObjectId} = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    firstName: {
        type: String,
        minlength: [3, 'First name must be 3 characters long.'],
        validate: {
            validator(value){
                return NAME_PATTERN.test(value);
            },
            message: 'First name must contains only English letters'
        }
    },
    lastName: {
        type: String,
        minlength: [5, 'Last name must be 5 characters long.'],
        validate: {
            validator(value){
                return NAME_PATTERN.test(value);
            },
            message: 'Last name must contains only English letters.'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: {
            validator(value){
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid and may contains only English letters.'
        }
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required.']
    },
    myPost: {
        type: [ObjectId],
        default: [],
        ref: 'Post'}
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