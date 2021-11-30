import page from './../node_modules/page/page.mjs';
import { render } from "./../node_modules/lit-html/lit-html.js";
import {logout} from "./api/data.js";
import {updateUserNav} from "./util.js";

import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {catalogPage} from "./views/listings.js";
import {detailsPage} from "./views/details.js";
import {createCarPage} from "./views/create.js";
import {editPage} from "./views/edit.js";
import {myListingsPage} from "./views/myLisitngs.js";
import {filteredCatalogPage} from "./views/filter.js";


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);
page('/', homePage);
page('/listings', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/create', createCarPage);
page('/edit/:id', editPage);
page('/myListings', myListingsPage);
page('/filter', filteredCatalogPage);

updateUserNav();
page.start();

// middleware
function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function onLogout() {
    logout();
    page.redirect('/')
}

