const {isUser} = require("../middleware/guards");
const {createPost, getPostById, updatePostBy, deletePostById, vote} = require("../sevices/post");
const {mapErrors, mapPost} = require("../util/mappers");
const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Create Page'})

});

router.post('/create', isUser(), async (req, res) => {

    const userId = req.session.user._id;
    const post = {
        title: req.body.title.trim(),
        keyword: req.body.keyword.trim(),
        location: req.body.location.trim(),
        date: req.body.date.trim(),
        image: req.body.image.trim(),
        description: req.body.description.trim(),
        author: userId,
    };
    try {
        await createPost(post);
        res.redirect('/catalog');

    } catch (err) {
        console.log(err)
        const errors = mapErrors(err)
        res.render('create', {title: 'Create Page', errors, data: post})
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = mapPost(await getPostById(id));

    if(post){

    if(req.session.user._id != post.author.id){
        return res.redirect('login');
    }
    res.render('edit', {title: 'Edit Post', post})

    }else{
        res.render('404', {title: '404'})

    }

});
router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    const existing = mapPost(await getPostById(id));

    if(req.session.user._id != existing.author.id){
        return res.redirect('/login');
    }

    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
    }
    try{
        await updatePostBy(id, post);
        res.redirect(`/catalog/` + id);
    }catch(err){
        console.log(err)
        const errors = mapErrors(err);
        post.id = id;
        res.render('edit', {title: 'Edit Post', post, errors})
    }

});


router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    const post = mapPost(await getPostById(id));

    if(req.session.user._id != post.author.id){
        return res.redirect('/login');
    }

    try{
        await deletePostById(id);
        res.redirect(`/catalog`);
    }catch(err){
        console.log(err)
        const errors = mapErrors(err);
        res.render('details', {title: post.title,errors})
    }
});

router.get('/vote/:id/:type', isUser(), async (req, res) => {
    console.log(req.params)
    const id = req.params.id
    const value = req.params.type == 'upvote' ? 1: -1;

    try{
        await vote(id, req.session.user._id, value);
        res.redirect('/catalog/' + id)
    }catch (err) {
        console.log(err)
        const errors = mapErrors(err);
        res.render('details', {title: 'Post Details', errors})
    }

});

module.exports = router;