const {register, login} = require("../sevices/user");
const mapErrors = require("../util/mappers");
const {isGuest, isUser} = require("../middleware/guards");


const router = require('express').Router();

router.get('/register',  isGuest(),(req, res) => {
    res.render('register', {title: 'Register Page'})
});

router.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.password.trim() < 4){
            throw new Error('Passwords must be at least 4 characters.')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match.')
        }
        const user = await register(req.body.name, req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        console.log(req.body)
        console.log('Register Controller '+ err)
        const errors = mapErrors(err);
        const context = {
            title: 'Register Page',
            data: {
                name: req.body.name,
                username:req.body.username
            },
            errors
        }
        res.render('register', context)
    }
})


router.get('/login', isGuest(),(req, res) => {
    res.render('login', {title: 'Login Page'})
});


router.post('/login', isGuest(),async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');

    } catch (err) {
        console.log('Login Controller '+ err)
        const errors = mapErrors(err);
        res.render('login', {layout: false, data: req.body.username, errors})

    }
});

router.get('/logout', isUser(),(req, res) => {
    delete req.session.user;
    res.redirect('/')
});


module.exports = router;