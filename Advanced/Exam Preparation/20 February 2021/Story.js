class Story {


    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
        this._idComment = 1;
    }

    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`
        }
        const username = this._likes[0];
        if (this._likes.length === 1) {

            return `${username} likes this story!`
        } else {
            return `${username} and ${this._likes.length - 1} others like this story!`
        }
    }

    like(username) {
        if (username === this.creator) {
            throw Error("You can\'t like your own story!");
        }

        if (this._likes.includes(username)) {
            throw Error("You can't like the same story twice!")
        }

        this._likes.push(username);
        return `${username} liked ${this.title}!`
    }

    dislike(username) {
        if (this._likes.includes(username)) {
            const usernameIdx = this._likes.indexOf(username);
            this._likes.splice(usernameIdx, 1)
            return `${username} disliked  ${this.title}`
        }
        return "You can't dislike this story!"
    }

    comment(username, content, id) {

        let isComment = this._comments.some(c => c.id === id);
        if (id === undefined || isComment === false) {
            this._comments.push({
                id: this._idComment,
                username,
                content,
                replies: []
            })
            this._idComment += 1;
            return `${username} commented on ${this.title}`
        } else {
            let comment = this._comments.find(c => c.id === id);
            let replyId = id + ((comment.replies.length + 1) / 10)
            comment.replies.push({
                id: replyId,
                username,
                content,
            })
            return `You replied successfully`
        }
    }

    toString(sortingType) {
        const sortingTypes = {
            'asc': () => {
                this._comments.sort((a, b) => a.id - b.id);
                this._comments.forEach(c => {
                    c.replies.sort((a,b) => a.id - b.id)
                })
            },
            'desc': () => {
                this._comments.sort((a, b) => b.id - a.id);
                this._comments.forEach(c => {
                    c.replies.sort((a,b) => b.id - a.id)
                })
            },
            'username': () => {
                this._comments.sort((a, b) => a.username.localeCompare(b.username));
                this._comments.forEach(c => {
                    c.replies.sort((a, b) => a.username.localeCompare(b.username))
                })
            }
        }
        sortingTypes[sortingType]()
        let result = [`Title: ${this.title}`, `Creator: ${this.creator}`, `Likes: ${this._likes.length}`, `Comments:`]
        this._comments.forEach(c => {
            result.push(`-- ${c.id}. ${c.username}: ${c.content}`)
            if(c.replies){
               c.replies.forEach(r => result.push(`--- ${r.id}. ${r.username}: ${r.content}`))
            }
        })

        return result.join('\n');

    }


}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));

