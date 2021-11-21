import {render} from "./../node_modules/lit-html/lit-html.js";
import {towns} from "./towns.js";
import {townsListTemp} from "./templates.js";

const townsDiv = document.getElementById('towns');
const allTowns = towns.map((t) => ({name: t}));

render(townsListTemp(allTowns), townsDiv);
document.getElementById('searchBtn').addEventListener('click', search);

console.log(allTowns)
function search() {

    let searchInput = document.getElementById('searchText');
    let searchText = searchInput.value.toLowerCase();

    let count = 0;
    const allTowns = towns.map((t) => ({name: t}));
    let matchTowns = allTowns.filter((t) => t.name.toLowerCase().includes(searchText));
    matchTowns.forEach((t) => {
        t.class = 'active';
        count += 1;
    })
    console.log(allTowns)

    document.getElementById('result').textContent = `${count} matches found`;
    searchInput.value = '';
}
