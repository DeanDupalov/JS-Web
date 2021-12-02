import {html} from './../../node_modules/lit-html/lit-html.js'
import {createComment, createGame, deleteById, getGame, getGameComments} from "../api/data.js";
import {getUserData} from "../util.js";


const detailsTemplate = (game, isOwner, onDelete, comments, addComment, isUser) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>
        <p class="text">${game.summary}</p>
        <!-- Bonus ( for Guests and Users ) -->
        ${commentsListTemplate(comments)}
        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : null}
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${isUser ? addCommentTemplate(addComment) : null}
    
</section>`;


const addCommentTemplate = (addComment) => html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${addComment} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>`;


const commentsListTemplate = (comments) => html`
<div class="details-comments">
    <h2>Comments:</h2>
    ${comments.length === 0
            ? html` <p class="no-comment">No comments.</p>`
            : html`<ul>${comments.map(commentCard)}</ul>`}
`;


const commentCard = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}.</p>
</li>`;


export async function detailsPage(ctx) {
    const game = await getGame(ctx.params.id);
    const comments = await getGameComments(game._id);


    const userData = getUserData();
    const isOwner = userData && game._ownerId === userData.id;
    const isUser = userData !== null;
    console.log(isOwner)
    ctx.render(detailsTemplate(game, isOwner, onDelete, comments, addComment,isUser));

    async function onDelete() {
        const choice = confirm('Are you sure you want to DELETE this meme?');
        if(choice){
            await deleteById(ctx.params.id)
            ctx.page.redirect('/')
        }
    }

    async function addComment(event){
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const comment = formData.get('comment').trim();

        if(comment === ''){
            return alert('Can not add empty comment!')
        }
        if(isOwner === true){
            alert('Authors can\'t comment on their own games.')
        }else{
            await createComment({
                gameId: game._id,
                comment,
            });

            ctx.page.redirect(`/details/${game._id}`);
        }

    }
}