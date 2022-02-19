const {register, login} = require("../sevices/user");
const {mapErrors} = require("../util/mappers");
const {isGuest, isUser} = require("../middleware/guards");


const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register', {title: 'Register Page'})
});

//TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error('Password is required.')
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match.')
        }
        const user = await register(
            req.body.firstName.trim(),
            req.body.lastName.trim(),
            req.body.email.trim(),
            req.body.password.trim()
        );

        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        const errors = mapErrors(err);

        const context = {
            title: 'Register Page',
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            },
            errors,
        };
        res.render('register', context)
    }

})


router.get('/login', isGuest(), (req, res) => {
    res.render('login', {title: 'Login Page'})
});

//TODO check form action, method, field names
router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); // TODO check where to redirect

    } catch (err) {
        // TODO send error message
        const errors = mapErrors(err);

        const context = {
            title: 'Login Page',
            data: {
                email: req.body.email,
            },
            errors,
        };
        res.render('login', context)

    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/')
});


module.exports = router;