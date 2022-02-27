const {register, login} = require("../sevices/user");

const {isGuest, isUser} = require("../middleware/guards");


const router = require('express').Router();

router.get('/register',  isGuest(),(req, res) => {

});

router.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.password.trim() == ''){
            throw new Error('Passwords is required.')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match.')
        }
        const user = await register(req.body.email, req.body.password);


    } catch (err) {


    }

})


router.get('/login', isGuest(),(req, res) => {

});


router.post('/login', isGuest(),async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);


    } catch (err) {


    }
});

router.get('/logout', isUser(),(req, res) => {

});


module.exports = router;