const router = require('express').Router();
const {getProducts} = require('./data')

router.get('/', async (req, res) => {
    const products = await getProducts();
    res.locals = {
        title: 'Catalog',
        products
    }
    res.render('catalog');
});

module.exports = router;