const {isUser, isAuthor} = require("../middleware/guards");
const mapErrors = require("../util/mappers");
const {createAd, getAdById, apply, update, deleteAd} = require("../sevices/ad");
const {addToMyAds} = require("../sevices/user");
const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Create Ad'});
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;

    const ad = {
        headline: req.body.headline.trim(),
        location: req.body.location.trim(),
        companyName: req.body.companyName.trim(),
        description: req.body.description.trim(),
        author: userId,
    };

    try {
        const result = await createAd(ad);
        await addToMyAds(userId, result._id);

        res.redirect('/catalog');

    } catch (err) {
        console.log('Create Ad' + err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create Ad', errors, data: ad})
    }

});

router.get('/edit/:id', isUser(), isAuthor(), async (req, res) => {
    const id = req.params.id;
    const ad = await getAdById(id);

    res.render('edit', {title: 'Edit Ad', ad})

});

router.post('/edit/:id', isUser(), isAuthor(), async (req, res) => {
    const id = req.params.id;

    const ad = {
        headline: req.body.headline.trim(),
        location: req.body.location.trim(),
        companyName: req.body.companyName.trim(),
        description: req.body.description.trim(),

    };

    try {
        await update(id, ad);
        res.redirect('/details/' + id);


    } catch (err) {

        console.log('Edit controller' + err);
        const errors = mapErrors(err);
        res.render('edit', {title: 'Edit Ad', errors, ad})
    }

});

router.get('/delete/:id', isUser(), isAuthor(), async (req, res) => {
    const id = req.params.id;

    try {
        await deleteAd(id);
        res.redirect('/catalog');

    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('details', {title: 'Details Page', errors})
    }

});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const ad = await getAdById(id);

    console.log(ad)

    if (req.session.user) {
        const user = req.session.user._id;
        ad.hasUser = true;

        if (user == ad.author._id) {
            ad.isAuthor = true;
        } else {
            ad.hasApplied = ad.usersApplied.find(u => u._id == req.session.user._id) != undefined;
        }

    }



    res.render('details', {ad})
});

router.get('/apply/:id', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const adId = req.params.id;

    try {
        await apply(userId, adId);

        res.redirect('/details/' + adId)

    } catch (err) {
        console.log('Apply ' + err);
        const errors = mapErrors(err);
        res.render('details', {title: 'Details PAge', errors})
    }

});


module.exports = router;