const {register, login} = require("../sevices/user");
const mapErrors = require("../util/mappers");
const {isGuest, isUser} = require("../middleware/guards");


const router = require('express').Router();

router.get('/register',  isGuest(),(req, res) => {
    res.render('register', {title: 'Register Page'})
});

//TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.password.trim() == ''){
            throw new Error('Passwords is required.')
        }
        if(req.body.password.trim().length <  5){
            throw new Error('Passwords must be at least 5 characters.')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match.')
        }
        const user = await register(req.body.email, req.body.password, req.body.descriptionSkills);
        req.session.user = user;
        res.redirect('/') //TODO check redirect requirements

    } catch (err) {
        console.log('Register controller '+ err)
        const errors = mapErrors(err);
        const context = {
            title: 'Register Page',
            data: {
                email: req.body.email,
                descriptionSkills: req.body.descriptionSkills,

            },
            errors
        }
        console.log(context)
        res.render('register', context)
    }

})


router.get('/login', isGuest(),(req, res) => {
    res.render('login', {title: 'Login Page'})
});


router.post('/login', isGuest(),async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');

    } catch (err) {

        console.log('Login controller '+ err)
        const errors = mapErrors(err);
        const context = {
            title: 'Login Page',
            data: {
                email:req.body.email
            },
            errors
        }
        res.render('login', context)

    }
});

router.get('/logout', isUser(),(req, res) => {
    delete req.session.user;
    res.redirect('/')
});


module.exports = router;