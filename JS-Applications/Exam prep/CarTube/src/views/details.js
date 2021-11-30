import {html} from './../../node_modules/lit-html/lit-html.js'
import {deleteById, getCar} from "../api/data.js";
import {getUserData} from "../util.js";


const detailsTemplate = (car, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>
        ${isOwner ? html`<div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} class="button-list">Delete</a>
        </div>`: null}
        
    </div>
</section>
`;


export async function detailsPage(ctx) {
    const car = await getCar(ctx.params.id);

    const userData = getUserData();
    const isOwner = userData && car._ownerId === userData.id;
    ctx.render(detailsTemplate(car, isOwner, onDelete));
    
    async function onDelete() {
        const choice = confirm('Are you sure you want to DELETE this Listing?');
        if(choice){
            await deleteById(ctx.params.id)
            ctx.page.redirect('/listings')
        }
    }
}