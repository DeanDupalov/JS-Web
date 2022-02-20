const User = require("../models/User");

const {hash, compare} = require('bcrypt');


async function register(email, password, gender) {
    const existing = await getUserByEmail(email);
    console.log('Register service ' + existing)
    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        hashedPassword,
        gender
    });
    await user.save();
    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('User does not exist.');
    }
    const hashMatch = await compare(password, user.hashedPassword);

    if(!hashMatch){
        throw new Error('Incorrect email or password.');
    }
    return user
}
async function addTripToUserHistory(userId, tripId) {
    const user = await User.findById(userId);
    user.tripHistory.push(tripId);
    await user.save();
}

async function getUserByEmail(email) {
    const user = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    return user
}
async function getUserById(id) {
    return User.findById(id)
        .populate('tripHistory', 'startPoint endPoint date time')
        .lean();
}

module.exports = {
    login,
    register,
    addTripToUserHistory,
    getUserById,
}