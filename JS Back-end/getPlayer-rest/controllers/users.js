const {register, login, logout} = require("../sevices/user");
const mapErrors = require("../util/mappers");
const {isGuest} = require("../middleware/guards");
const router = require('express').Router();


router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email.trim() == '') {
            throw new Error('Email and Password are required.')
        }

        const user = await register(
            req.body.email.trim()
                .toLowerCase(),
            req.body.password.trim()
        );
        res.status(201).json(user);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})


    }

});


router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(
            req.body.email.trim()
                .toLowerCase(),
            req.body.password.trim()
        );
        res.status(200).json(user);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})

    }
});

router.get('/logout', (req, res) => {
    const token = req.user?.token;
    logout(token);
    res.status(204).end()
});


module.exports = router;