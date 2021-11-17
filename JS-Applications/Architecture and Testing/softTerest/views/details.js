import {e} from './dom.js';
import {deleteByIdea, getById} from "../src/api/data.js";


const section = document.getElementById('detailsPage');
section.remove();
let ctx = null;

export async function showDetailsPage(ctxTarget, id) {
    ctx = ctxTarget;
    ctx.showSection(section);
    loadIdea(id)
}

async function loadIdea(id) {
    const idea = await getById(id);

    section.replaceChildren(createIdeaDiv(idea));
}

function createIdeaDiv(idea) {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(e('img', { className: 'det-img', src: idea.img}));
    fragment.appendChild(e('div', {className: 'desc'},
        e('h2', {className: 'display-5'}, idea.title),
        e('p', {className: 'infoType'}, 'Description'),
        e('p', {className: 'idea-description'}, idea.description)
        ));
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    console.log(idea._ownerId);
    if (userData && userData.id === idea._ownerId){
        fragment.appendChild(e('div', {className: 'text-center'},
            e('a', {className: 'btn detb', href: '', onClick: onDelete}, 'Delete')
        ));

    }
    return fragment;

    async function onDelete(event) {
        event.preventDefault()
        const confirmed = confirm('Are you sure you want to delete this Idea?');
        if(confirmed){
            await deleteByIdea(idea._id);
            ctx.goTo('catalog');
        }
    }
}



