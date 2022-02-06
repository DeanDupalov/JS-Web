const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models/index');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');
const authService = require('./services/auth');

const {home} = require("./controllers/home");
const {about} = require("./controllers/about");
const create = require("./controllers/create");
const edit = require("./controllers/edit");
const {details} = require("./controllers/detais");
const del = require("./controllers/delete");
const accessory = require("./controllers/accessory");
const attach = require("./controllers/attach");
const auth = require("./controllers/auth");

const {notFound} = require("./controllers/notFound");
const {isLoggedIn} = require("./services/utils");

start();

async function start() {
    await initDb();


    const app = express();

    app.engine('hbs', hbs.create({extname: '.hbs'}).engine);
    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'man utd',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: 'auto'}
    }));

    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static('static'));
    app.use(carsService());
    app.use(accessoryService());
    app.use(authService());

    app.get('/', home);
    app.get('/about', about);

    app.get('/details/:id', details);

    app.route('/create')
        .get(isLoggedIn(),create.get)
        .post(isLoggedIn(),create.post);

    app.route('/delete/:id')
        .get(isLoggedIn(),del.get)
        .post(isLoggedIn(),del.post);

    app.route('/edit/:id')
        .get(isLoggedIn(),edit.get)
        .post(isLoggedIn(),edit.post);

    app.route('/accessory')
        .get(isLoggedIn(),accessory.get)
        .post(isLoggedIn(),accessory.post);

    app.route('/attach/:id')
        .get(isLoggedIn(),attach.get)
        .post(isLoggedIn(),attach.post);

    app.route('/register')
        .get(auth.registerGet)
        .post(auth.registerPost);

    app.route('/login')
        .get(auth.loginGet)
        .post(auth.loginPost);

    app.get('/logout', auth.logout);

    app.all('*', notFound);

    app.listen(3000, () => console.log('>>> Server running on port 3000'))
}

