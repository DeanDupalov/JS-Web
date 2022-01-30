const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models/index')

const carsService = require('./services/cars')
const accessoryService = require('./services/accessory')

const {home} = require("./controllers/home");
const {about} = require("./controllers/about");
const create = require("./controllers/create");
const edit = require("./controllers/edit");
const {details} = require("./controllers/detais");
const del = require("./controllers/delete");
const accessory = require("./controllers/accessory");
const attach = require("./controllers/attach");
const {notFound} = require("./controllers/notFound");

start();

async function start() {
    await initDb();


    const app = express();

    app.engine('hbs', hbs.create({extname: '.hbs'}).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static('static'));
    app.use(carsService());
    app.use(accessoryService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.route('/create')
        .get(create.get)
        .post(create.post);

    app.route('/delete/:id')
        .get(del.get)
        .post(del.post);

    app.route('/edit/:id')
        .get(edit.get)
        .post(edit.post);

    app.route('/accessory')
        .get(accessory.get)
        .post(accessory.post);

    app.route('/attach/:id')
        .get(attach.get)
        .post(attach.post);


    app.all('*', notFound);

    app.listen(3000, () => console.log('>>> Server running on port 3000'))
}

