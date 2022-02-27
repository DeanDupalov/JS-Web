const {getFirstThree, getAllAds} = require("../sevices/ad");
const {isUser} = require("../middleware/guards");
const {getAuthorAds} = require("../sevices/user");

const router = require('express').Router();

router.get('/',async (req, res) => {
    const ads = await getFirstThree();

    res.render('home', {title: 'Home Page', ads})
});
router.get('/catalog', async (req, res) => {
    const ads = await getAllAds();
    res.render('catalog', {title: 'All Ads', ads})

});

router.get('/search', isUser(), (req, res) => {

    res.render('search', {title: 'Search'})


});

router.post('/search',isUser(), async (req, res) => {
    const email = req.body.email.toLowerCase();
    const author = await getAuthorAds(email);

    res.render('search', {title: 'Search', ads: author.myAds})

});

module.exports = router;