import {e} from './dom.js';
import {getById} from "../src/api/data.js";


const section = document.getElementById('detailsPage');
section.remove();

export async function showDetailsPage(ctx, id) {
    ctx.showSection(section);
}

async function loadIdea(id) {
    const idea = await getById(id);

    section.replaceChildren((createIdeaDiv(idea)));
}

function createIdeaDiv(idea) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(e('img', {className: 'det-img', src: idea.img}));
    fragment.appendChild(e('div', {className: 'desc'}),
        e('h2', {className: 'display-5'}, idea.title),
        e('p', {className: 'infoType'}, 'Description'),
        e('p', {className: 'idea-description'}, idea.description),
    );

    fragment.appendChild(e('div', {className: 'text-center'}),
        e('a', {className: 'btn detb', href: ''}, 'Delete')
    );

    return fragment;
}

/*
<img class="det-img" src="./images/dinner.jpg"/>
<div class="desc">
    <h2 class="display-5">Dinner Recipe</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">There are few things as comforting as heaping bowl of pasta at the end of a long
        day. With so many easy pasta recipes out there, there's something for every palate to love. That's why
        pasta
        makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due to its
        versatility.</p>
</div>
<div class="text-center">
    <a class="btn detb" href="">Delete</a>
</div>
 */