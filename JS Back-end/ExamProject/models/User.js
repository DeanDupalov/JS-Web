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
    hashedPassword: {type: String, required: true},
    descriptionSkills: {type: String, required: true, maxlength:[40, 'The description of skills should be a maximum of 40 characters long.']},
    myAds: {type: [ObjectId], default: [], ref: 'Ad'},
});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User