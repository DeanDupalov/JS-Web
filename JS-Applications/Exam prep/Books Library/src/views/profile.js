import { html } from './../../node_modules/lit-html/lit-html.js'
import {getMyBooks} from "../api/data.js";
import {getUserData} from "../util.js";

export let profileTemplate = (books, userData) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length === 0
        ? html`<p class="no-books">No books in database!</p>`
        : html`<ul class="my-books-list">${books.map(bookCard)}</ul>`}
</section>`;

const bookCard = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;



export async function myBooksPage(ctx) {
    const userData = getUserData();
    const books = await getMyBooks(userData.id);
    ctx.render(profileTemplate(books, userData));
}

// <section id="user-profile-page" className="user-profile">
//     <article className="user-info">
//
//         <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
//             <div className="user-content">
//                 <p>Username: ${userData.username}</p>
//                 <p>Email: ${userData.email}</p>
//                 <p>My memes count: ${memes.length}</p>
//             </div>
//     </article>
//     <h1 id="user-listings-title">User Memes</h1>
//     <div className="user-meme-listings">
//         ${memes.length === 0
//         ? html` <p class="no-memes">No memes in database.</p>`
//         : memes.map(memeCard)}
//     </div>
// </section>