import { html } from './../../node_modules/lit-html/lit-html.js'
import {createMeme} from "../api/data.js";
import {notify} from "../notify.js";

export const createMemeCard = (onSubmit) => html`
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export function createMemePage(ctx) {
    ctx.render(createMemeCard(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();


        if(title === '' || description === '' || imageUrl === ''){
            return notify('All fields are required!')
        }

        await createMeme({
            title,
            description,
            imageUrl
        });

        ctx.page.redirect('/memes');
    }
}

