const {getAllPublicCourses} = require("../sevices/course");
const {isUser} = require("../middleware/guards");
const {getUserById} = require("../sevices/user");
const router = require('express').Router();

router.get('/', async (req, res) => {
    const publicCourses = await getAllPublicCourses()

    res.render('home', {title: 'Home Page', publicCourses})
});

router.get('/profile', isUser(), async (req, res) => {
    const id = req.session.user._id;
    const user = await getUserById(id);
    console.log(user)
    user.coursesNames = user.courses.map(c => c.title).join(', ')

    res.render('profile', {title: 'My Profile', user})
});


module.exports = router;