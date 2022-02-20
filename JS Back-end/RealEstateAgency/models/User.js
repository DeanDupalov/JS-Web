const {Schema, model} = require('mongoose');

NAME_PATTERN =/^([a-zA-Z]+) ([a-zA-Z]+)$/;

const userSchema = new Schema({
    name: {type: String,
        required: true,
        validate: {
            validator(value){
                return NAME_PATTERN.test(value);
            },
            message: 'Full name must be in the right format '
        }
    },
    username: {type: String, minlength:[5, 'Username must be at least 4 characters.']},
    hashedPassword: {type: String, required: true},
});

userSchema.index({name: 1, username: 1},{
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})


const User = model('User', userSchema);

module.exports = User;