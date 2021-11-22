import { html } from './../node_modules/lit-html/lit-html.js'
import {ifDefined} from "./../node_modules/lit-html/directives/if-defined.js";

let row = (person) => html`
<tr class=${ifDefined(person.class)}>
    <td>${person.name}</td>
    <td>${person.email}</td>
    <td>${person.course}</td>
</tr>`

export let rows = (people) => html`
${people.map((p) => row(p))}`