const usersController = require('../controllers/users');
const catalogController = require('../controllers/catalog');
const homeController = require('../controllers/home');

module.exports = (app) => {
    app.use(homeController);
    app.use('/users',usersController);
    app.use('/data/catalog', catalogController);
}