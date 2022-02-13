const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const {mapErrors} = require("../services/utils");

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register'});
});

router.post('/register',
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({min: 3}).withMessage('Username must be at least 5 characters long.')
        .isAlphanumeric().withMessage('Username must contain only English letters and digits.'),
    body('password')
        .isLength({min: 3}).withMessage('Password must be at least 8 characters long.')
        .isAlphanumeric().withMessage('Password must contain only English letters and digits.'),
    body('repeatPassword')
        .custom((value, {req, location, path}) => value == req.body.password)
        .withMessage('Passwords do not match.'),
    async (req, res) => {
        const {errors} = validationResult(req);
        try {
            if (errors.length > 0) {
                throw errors;
            }

            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');

        } catch (err) {
            res.locals.errors = mapErrors(err);

            const data = {
                username: req.body.username
            }
            return res.render('register', {title: 'Register', data})
        }
    }
);

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'});
});

router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/');
    } catch (err) {
        res.locals.errors = [{msg: err.message}];
        res.render('login', {title: 'Login'});
    }

});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
})

module.exports = router;