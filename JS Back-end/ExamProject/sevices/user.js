const User = require("../models/User");
const {hash, compare} = require('bcrypt');



async function register(email, password, descriptionSkills) {
    const existing = await getUserByUsername(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        hashedPassword,
        descriptionSkills
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

    if (!hashMatch) {
        throw new Error('Incorrect email or password.');
    }
    return user
}


async function getUserByUsername(email) {
    const user = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    return user
}

async function addToMyAds(userId, adId) {
    const user = await User.findById(userId);

    if (user.myAds.includes(adId)) {
        throw new Error('This Ad is already in My Ads.')
    }
    user.myAds.push(adId);


    await user.save();
}

async function getAuthorAds(email) {
    const author =await User.findOne({email})
        .populate('myAds', 'headline companyName')
        .lean();

    return author;
}
module.exports = {
    login,
    register,
    addToMyAds,
    getAuthorAds
}