import {html} from './../../node_modules/lit-html/lit-html.js'
import {addLike, checkIfBookIsLikedFromUser, deleteById, getBook, getTotalLikesBook} from "../api/data.js";
import {getUserData} from "../util.js";


const detailsTemplate = (book, isOwner, onDelete, onLike, likes, showLikeBtn) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${bookControlsTemplate(book, isOwner, onDelete)}
            ${likeControlsTemplate(showLikeBtn, onLike)}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

const bookControlsTemplate = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)" >Delete</a>`
    } else {
        return null
    }
}

const likeControlsTemplate = (showLikeBtn, onLike) => {
    if (showLikeBtn) {
        return html`<a @click=${onLike} id="likeBtn" class="button" href="javascript:void(0)">Like</a>`
    } else {
        return null
    }
}


export async function detailsPage(ctx) {
    const userData = getUserData();

    const [book, likes, hasLike] = await Promise.all([
        getBook(ctx.params.id),
        getTotalLikesBook(ctx.params.id),
        userData ? checkIfBookIsLikedFromUser(ctx.params.id, userData.id) : 0
    ]);


    const isOwner = userData && book._ownerId === userData.id;
    // const showLikeBtn = userData !== null && isOwner === false && hasLike === false;
    const showLikeBtn = true
    console.log(showLikeBtn);

    ctx.render(detailsTemplate(book, isOwner, onDelete, onLike, likes, showLikeBtn));

    async function onDelete() {

        const choice = confirm('Are you sure you want to DELETE this book?');
        if (choice) {
            await deleteById(ctx.params.id)
            ctx.page.redirect('/catalog')
        }
    }

    async function onLike() {
        await addLike({bookId: book._id});
    }
}
