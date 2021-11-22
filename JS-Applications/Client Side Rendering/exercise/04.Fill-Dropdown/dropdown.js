import {get, post} from '../api.js'
import {render} from './../node_modules/lit-html/lit-html.js'
import {townsTemp} from "./templates.js";
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const selectElement = document.getElementById('menu');


const form = document.getElementById('form-id');
form.addEventListener('submit', submitHandler);


async function addItem() {
    const data = await get(url);
    const townsArr = Object.values(data);
    render(townsTemp(townsArr), selectElement);
}
async function submitHandler(e) {
    e.preventDefault();
    let form = e.target;
    const formData = new FormData(form);
    const text = formData.get('item')
    await post(url, {text});
    const data = await get(url);
    const townsArr = Object.values(data);
    render(townsTemp(townsArr), selectElement);
    form.reset();
}

addItem()
