const {getCourseById} = require("../sevices/course");

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
function isCreator() {
    return async function (req, res, next) {
        const userId = req.session.user._id;
        const id = req.params.id;
        const course = await getCourseById(id);

        if (course.creator._id == userId) {
            next();
        } else {
            res.redirect('/login')
        }
    }
}
module.exports = {
    isUser,
    isGuest,
    isCreator
}