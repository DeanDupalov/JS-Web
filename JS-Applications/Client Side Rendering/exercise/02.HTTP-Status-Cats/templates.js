import {html} from "../node_modules/lit-html/lit-html.js";
//id, statusCode, statusMessage and imageLocation
let catCardTemp = (cat, statsHandler) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${statsHandler}>Show status code</button>
            <div class="status hidden" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`

export let catsListTemp = (cats, statsHandler) => html`
    <ul>
        ${cats.map((cat) => catCardTemp(cat, statsHandler))}
    </ul>`