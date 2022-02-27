const User = require("../models/User");
const {hash, compare} = require('bcrypt');

// TODO add all fields required by exam
async function register(email, password) {
    const existing = await getUserByUsername(email);

    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        hashedPassword
    });
    await user.save();
    return user;
}

async function login(email, password) {
    const user = await getUserByUsername(email);

    if (!user) {
        throw new Error('User does not exist.');
    }
    const hashMatch = await compare(password, user.hashedPassword);

    if(!hashMatch){
        throw new Error('Incorrect username or password.');
    }
    return user
}

// TODO identify user by given identifier
async function getUserByUsername(email) {
    const user = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    return user
}



module.exports = {
    login,
    register
}