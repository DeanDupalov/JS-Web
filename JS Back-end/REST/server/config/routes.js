const authController = require('../controllers/auth');
const catalogController = require('../controllers/catalog');
const homeController = require('../controllers/home');

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use('/data/catalog', catalogController);
}