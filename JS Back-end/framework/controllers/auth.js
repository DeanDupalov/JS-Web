const {register, login} = require("../sevices/user");
const mapErrors = require("../util/mappers");
const {isGuest, isUser} = require("../middleware/guards");


const router = require('express').Router();

router.get('/register',  isGuest(),(req, res) => {
    res.render('register', {layout: false})
});
//TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.password.trim() == ''){
            throw new Error('Passwords is required.')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match.')
        }
        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/') //TODO check redirect requirements
    } catch (err) {
        const errors = mapErrors(err);
        res.render('register', {layout: false, data: req.body.username,errors})
    }

})


router.get('/login', isGuest(),(req, res) => {
    res.render('login', {layout: false})
});

//TODO check form action, method, field names
router.post('/login', isGuest(),async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); // TODO check where to redirect

    } catch (err) {
        // TODO send error message
        const errors = mapErrors(err);
        res.render('login', {layout: false, data: req.body.username, errors})

    }
});

router.get('/logout', isUser(),(req, res) => {
    delete req.session.user;
    res.redirect('/')
});


module.exports = router;