import { html } from './../../node_modules/lit-html/lit-html.js'
import {editCar, getCar} from "../api/data.js";




const editTemplate = (car, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
`;


export async function editPage(ctx) {
    const car = await getCar(ctx.params.id);
    ctx.render(editTemplate(car, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const yearStr = formData.get('year').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const priceStr = formData.get('price').trim();

        const year = Number(yearStr);
        const price = Number(priceStr);

        if(brand === '' || model === '' || description === '' || imageUrl === '' || year < 0 || price < 0){
            return alert('All fields are required, Year and Price must be positive!')
        }

        await editCar(ctx.params.id,{
            brand,
            model,
            description,
            year,
            imageUrl,
            price,
        });

        ctx.page.redirect(`/details/${car._id}`);
    }
}