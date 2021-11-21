import {render} from "../node_modules/lit-html/lit-html.js";
import {townsListTemp} from "./templates.js";


let form = document.getElementById('form-towns');
form.addEventListener('submit', displayTowns);
let divRoot = document.getElementById('root');

function displayTowns(e) {
    e.preventDefault();
    let form = e.target;
    const formData = new FormData(form);
    const townsString = formData.get('towns');
    const towns = townsString.split(', ');
    form.reset();
    render(townsListTemp(towns), divRoot);
}