function mapErrors(error) {
    if (Array.isArray(escape)) {
        return error
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(e => ({msg: e.message}));
    } else if (typeof error.message == 'string') {
        return [{msg: error.message}]
    } else {
        return [{msg: 'Request error.'}]
    }
}

function mapPost(post) {
    const model = {
        id: post._id,
        title: post.title,
        keyword: post.keyword,
        location: post.location,
        date: post.date,
        image: post.image,
        description: post.description,
        author: post.author,
        votes: post.votes,
        rating: post.rating,
    };

    return model
}

module.exports = {
    mapErrors,
    mapPost
};