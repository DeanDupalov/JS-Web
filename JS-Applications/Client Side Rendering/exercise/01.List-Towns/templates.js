import {html} from "../node_modules/lit-html/lit-html.js";

let townTemp = (town) => html`<li>${town}</li>`
export let townsListTemp = (towns) => html`
<ul>
    ${towns.map((t) => townTemp(t))}
</ul>`