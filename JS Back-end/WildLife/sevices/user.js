const User = require("../models/User");
const {hash, compare} = require('bcrypt');

// TODO add all fields required by exam
async function register(firstName, lastName, email, password) {
    console.log(email)
    const existing = await getUserByEmail(email);
    console.log(existing)

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email,
        hashedPassword
    });
    await user.save();
    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Incorrect email or password.');
    }
    const hashMatch = await compare(password, user.hashedPassword);

    if(!hashMatch){
        throw new Error('Incorrect email or password.');
    }
    return user
}

// TODO identify user by given identifier
async function getUserByEmail(email) {
    const user = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    return user
}



module.exports = {
    login,
    register
}