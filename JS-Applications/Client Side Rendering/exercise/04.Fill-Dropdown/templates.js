import {html} from './../node_modules/lit-html/lit-html.js'

export const townTemp = (town) => html`
    <option .value=${town._id}>${town.text}</option>`

export let townsTemp = (towns) => html`
    ${towns.map((t) => townTemp(t))}`
