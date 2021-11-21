import {html} from "./../node_modules/lit-html/lit-html.js";

import {ifDefined} from "./../node_modules/lit-html/directives/if-defined.js";


export let townTemp = (town) => html`<li class=${town.class}>${town.name}</li>`

export let townsListTemp = (towns) => html`
    <ul>
        ${towns.map((t) => townTemp(t))}
    </ul>`