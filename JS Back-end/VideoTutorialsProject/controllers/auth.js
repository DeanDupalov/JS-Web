const {register, login} = require("../sevices/user");
const mapErrors = require("../util/mappers");
const {isGuest, isUser} = require("../middleware/guards");


const router = require('express').Router();

router.get('/register',  isGuest(),(req, res) => {
    res.render('register', {title: ' Register Page'});
});

router.post('/register', isGuest(), async (req, res) => {
    const PATTERN = /^[a-zA-Z0-9]+$/;
    try {
        if(req.body.password.trim() == ''){
            throw new Error('Passwords is required.')
        }
        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords do not match.')
        }
        if(!PATTERN.test(req.body.password)){
            throw new Error('Password must be in the right format. Only english letters and digits!')

        }
        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        const errors = mapErrors(err);
        const context = {
            title: 'Register Page',
            data: {
                username: req.body.username
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
        console.log('Login controller ', err)
        const errors = mapErrors(err);
        res.render('login', {title: 'Login Page', data: req.body.username, errors})

    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/')
});


module.exports = router;