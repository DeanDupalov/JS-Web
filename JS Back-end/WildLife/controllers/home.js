const {getAllPosts, getPostById} = require("../sevices/post");
const {mapPost} = require("../util/mappers");
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home', {title: 'Home Page'});
});

router.get('/catalog', async (req, res) => {
    const posts = await getAllPosts();
    res.render('all-posts', {title: 'Catalog Page', posts})
});

router.get('/catalog/:id', async (req, res) => {

    const id = req.params.id;
    const post = mapPost(await getPostById(id));

    if (req.session.user) {
        post.hasUser = true;
        if (req.session.user._id == post.author.id) {
            post.isAuthor = true;
        }
        // TODO check votes
    }

    res.render('details', {title: post.title, post})
});

module.exports = router;