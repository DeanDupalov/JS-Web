const express = require("express");
const cors = require('../middleware/cors')
const auth = require('../middleware/auth')

module.exports = (app) => {
    app.use('/static', express.static('static'));
    app.use(express.json());
    app.use(cors());
    app.use(auth());
}