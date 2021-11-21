import {render} from "../node_modules/lit-html/lit-html.js";
import {catsListTemp} from "./templates.js";
import {cats} from "./catSeeder.js";

const sectionAllCards = document.getElementById('allCats');

render(catsListTemp(cats, detailsHandler), sectionAllCards);

function detailsHandler(e) {
    let btn = e.target;
    let statusInfoElement = e.target.parentElement.querySelector('.status');
    btn.textContent = btn.textContent === 'Show status code'
        ? 'Hide status code'
        : 'Show status code';

    if(statusInfoElement.classList.contains('hidden')){
        statusInfoElement.classList.remove('hidden')
    }else {
        statusInfoElement.classList.add('hidden')
    }
}