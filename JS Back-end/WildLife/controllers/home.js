const {getAllPosts} = require("../sevices/post");
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home', {title: 'Home Page'});
});

router.get('/catalog', async (req, res) => {
    const posts = await getAllPosts();
    res.render('all-posts', {title: 'Catalog Page', posts})
});

module.exports = router;