import {e, showView} from './dom.js';
import {showCreate} from './create.js';
import {showDetails} from './details.js';

let moviesCache = null;
let lasLoaded = null;
const maxAge = 60000;

const section = document.getElementById('home-page');
const catalog = document.querySelector('.card-deck.d-flex.justify-content-center')
section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate();
})
catalog.addEventListener('click', (event => {
    let target = event.target;
    if (target.tagName === 'BUTTON') {
        target = target.parentElement;
    }
    if (target.tagName === 'A') {
        const id = target.dataset.id;
        showDetails(id);
    }
}));
section.remove();

export function showHome() {
    showView(section);
    getMovies();
}

async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading...'));

    const now = Date.now();
    if (moviesCache === null || (now - lasLoaded) > maxAge) {
        lasLoaded = now;
        const response = await fetch('http://localhost:3030/data/movies');
        const data = await response.json();
        moviesCache = data;
    }


    catalog.replaceChildren(...moviesCache.map(createMovieCard));

}

function createMovieCard(movie) {
    const element = e('div', {className: 'card mb-4'});
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a data-id="${movie._id}" href="#">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;

    return element;
}