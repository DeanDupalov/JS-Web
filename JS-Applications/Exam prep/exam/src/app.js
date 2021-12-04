import page from './../node_modules/page/page.mjs';
import { render } from "./../node_modules/lit-html/lit-html.js";
import {updateUserNav} from "./util.js";

import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {logout} from "./api/data.js";
import {registerPage} from "./views/register.js";
import {catalogPage} from "./views/catalog.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {createAlbumPage} from "./views/create.js";
import {searchPage} from "./views/search.js";



const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createAlbumPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/search', searchPage);

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




