import {html} from './../../node_modules/lit-html/lit-html.js'
import {searchByName} from "../api/data.js";
import {albumCard} from "./catalog.js";
import {updateDetailsBtn} from "../util.js";



export let beforeSearchTemplate = (onClick) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onClick} class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        </div>
    </section>`;

export let searchTemplate = (albums, onClick) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onClick} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
    ${albums.length === 0
            ? html`<p class="no-result">No result.</p>`
            : albums.map(albumCard)}
    </div>
    </div>
</section>`;


export async function searchPage(ctx) {

    ctx.render(beforeSearchTemplate(onClick));

    async function onClick() {
        const queryInput = document.getElementById('search-input');
        const query = queryInput.value;


        const albums = await searchByName(query);
        ctx.render(searchTemplate(albums, onClick));
        updateDetailsBtn()
    }

}
