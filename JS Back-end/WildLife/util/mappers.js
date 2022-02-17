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
        author: authorViewModel(post.author),
        votes: post.votes.map(voterViewModel),
        rating: post.rating,
    };

    return model
}
function voterViewModel(user) {
    return {
        _id: user._id,
        email: user.email,
    }

}
function authorViewModel(user) {
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
    }
}

module.exports = {
    mapErrors,
    mapPost
};