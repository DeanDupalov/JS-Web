const {isUser, isCreator} = require("../middleware/guards");
const {createCourse, getCourseById, enroll, deleteCourseById, update} = require("../sevices/course");
const mapErrors = require("../util/mappers");
const {addCourseInUser} = require("../sevices/user");
const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Create Course'});
});
router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const isPublic = (req.body.isPublic != undefined)

    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        isPublic: isPublic,
        creator: userId,

    };

    try {
        await createCourse(course);
        res.redirect('/');
    } catch (err) {
        console.log('Create house' + err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create Course', errors, course})
    }
});


router.get('/edit/:id', isUser(), isCreator(), async (req, res) => {
    const id = req.params.id;
    const course = await getCourseById(id);
    console.log(course)


    res.render('edit', {title: 'Edit Course', course})
});

router.post('/edit/:id', isUser(), isCreator(), async (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    const course = {
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        imageUrl: req.body.imageUrl.trim(),
        isPublic: (req.body.isPublic != undefined)
    }
    console.log('course ' + course.isPublic)
    try {
        await update(id, course);
        res.redirect('/details/' + id)
    } catch (err) {
        console.log('Enroll' + err);
        const errors = mapErrors(err);
        res.render('edit', {title: 'Edit Course', errors})
    }
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const course = await getCourseById(id);

    if (req.session.user) {
        const user = req.session.user._id;
        course.hasUser = true;

        if (user == course.creator._id) {
            course.isCreator = true;
        } else {
            course.isEnrolled = course.usersEnrolled.find(s => s._id == req.session.user._id) != undefined;
        }
    }

    res.render('details', {title: 'Details Page', course})

});

router.get('/delete/:id', isUser(), isCreator(), async (req, res) => {
    const id = req.params.id;

    try {
        await deleteCourseById(id);
        res.redirect('/');

    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('details', {title: 'Details Page', errors})
    }

});

router.get('/enroll/:id', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const username = req.session.user.username;
    const courseId = req.params.id;
    console.log()
    try {
        await enroll(userId, courseId);
        await addCourseInUser(username, courseId);
        res.redirect('/details/' + courseId)

    } catch (err) {
        console.log('Enroll' + err);
        const errors = mapErrors(err);
        res.render('details', {title: 'Details page', errors})
    }

});

module.exports = router;