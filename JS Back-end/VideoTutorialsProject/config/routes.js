const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const courseController = require('../controllers/course');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(courseController);
}