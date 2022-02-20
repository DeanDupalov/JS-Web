const Post = require('../models/Post');
const {mapPost} = require("../util/mappers");

async function createPost(post) {
    const result = new Post(post);
    await result.save();

    return result;
}

async function getAllPosts() {
    const post = await Post.find({});
    return post.map(mapPost)
}

async function getPostById(id) {
    return Post.findById(id)
        .populate('author', 'firstName lastName')
        .populate('votes', 'email');

}

async function getPostsByAuthor(userId) {
    return Post.find({author: userId}).populate('author', 'firstName lastName')
}

async function updatePostBy(id, post) {
    const existing = await Post.findById(id);

    existing.title = post.title;
    existing.keyword = post.keyword;
    existing.location = post.location;
    existing.date = post.date;
    existing.image = post.image;
    existing.description = post.description;

    await existing.save();
    return true
}

async function deletePostById(id) {
    return Post.findByIdAndDelete(id)
}

async function vote(postId, userId, value) {
    const post = await Post.findById(postId);

    if(post.votes.includes(userId)){
        throw new Error('User has already voted.')
    }

    post.votes.push(userId);
    post.rating += value;

    await post.save()

}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostBy,
    deletePostById,
    vote,
    getPostsByAuthor
}