const {getAdById} = require("../sevices/ad");

function isUser() {
    return function (req, res, next) {
        if(req.session.user) {
            next()
        }else {
            res.redirect('/login');
        }
    }
}

function isGuest() {
    return function (req, res, next) {
        if(req.session.user) {
            res.redirect('/');
        }else {
            next();
        }
    }
}
function isAuthor() {
    return async function (req, res, next) {
        const userId = req.session.user._id;
        const id = req.params.id;
        const ad = await getAdById(id);

        if (ad.author._id == userId) {
            next();
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = {
    isUser,
    isGuest,
    isAuthor
}