const {getAllHouses, getLastThree, getHousesByType} = require("../sevices/housing");
const {isUser} = require("../middleware/guards");
const router = require('express').Router();

router.get('/', async (req, res) => {
    const houses = await getLastThree();

    res.render('home', {title: 'Home Page', houses})

});

router.get('/catalog', async (req, res) => {
    const houses = await getAllHouses();
    res.render('catalog', {title: 'Catalog', houses})

});

router.get('/search', isUser(), (req, res) => {
    console.log('search get')
    res.render('search', {title: 'Search'})


});

router.post('/search',isUser(), async (req, res) => {
    const type = req.body.type.toLowerCase();
    const houses = await getHousesByType(type);
    console.log(type)
    console.log(houses)
    res.render('search', {title: 'Search', houses})

});

module.exports = router;