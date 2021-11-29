import page from './../node_modules/page/page.mjs';
import { render } from "./../node_modules/lit-html/lit-html.js";
import { getUserData } from "./util.js";


// import { homePage } from './views/home.js';
import { catalogPage } from "./views/catalog.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/data.js";
import { detailsPage } from "./views/details.js";
import {addPage} from "./views/addBook.js";
import {editPage} from "./views/edit.js";
import {myBooksPage} from "./views/profile.js";



const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout)



page(decorateContext);
page('/', catalogPage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/add', addPage);
page('/edit/:id', editPage);
page('/myBooks', myBooksPage);

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
    updateUserNav();
    page.redirect('/catalog')
}

function updateUserNav() {
    const userData = getUserData();

    if(userData){
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';

        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`
    }else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

