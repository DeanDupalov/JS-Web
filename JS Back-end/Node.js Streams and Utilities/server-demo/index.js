const express = require('express');
const hbs = require('express-handlebars');
const homeController = require('./src/home')
const catalogController = require('./src/catalog.js')


const app = express();

app.engine('.hbs', hbs.create({
    extname: '.hbs',
}).engine);
app.set('view engine', '.hbs');
app.use('/content', express.static('static'))

app.get('/', homeController);

app.use('/catalog', catalogController);

app.listen(3000, () => console.log('>>> Server running on port 3000'));

