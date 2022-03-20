const User = require("../models/User");
const {hash, compare} = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'My top secret key';
const blackList = [];

async function register(email, password) {
    const existing = await getUserByUsername(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        hashedPassword
    });
    await user.save();
    return createSession(user);
}

async function login(email, password) {
    const user = await getUserByUsername(email);

    if (!user) {
        throw new Error('Incorrect email or password!');
    }
    const hashMatch = await compare(password, user.hashedPassword);

    if (!hashMatch) {
        throw new Error('Incorrect email or password.');
    }
    return createSession(user)
}

function logout(token) {
    blackList.push(token);
}


async function getUserByUsername(email) {
    const user = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    return user
}



function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    }
}

function verifySession(token) {
    if(blackList.includes(token)){
        throw new Error('Token is invalidated.')
    }
    const payload = jwt.verify(token, JWT_SECRET);
    return {
        email: payload.email,
        _id: payload._id,
        token
    }
}


module.exports = {
    register,
    login,
    logout,
    verifySession
}