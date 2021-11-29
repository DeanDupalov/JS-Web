import page from './../node_modules/page/page.mjs';
import { render } from "./../node_modules/lit-html/lit-html.js";
import { homePage } from './views/home.js';
import {catalogPage} from "./views/catalog.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {logout} from "./api/data.js";
import {getUserData} from "./util.js";
import {createMemePage} from "./views/createMeme.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {profilePage} from "./views/profile.js";


const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);
page('/', homePage);
page('/memes', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createMemePage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/profile', profilePage);

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
    page.redirect('/')
}

function updateUserNav() {
    const userData = getUserData();

    if(userData){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';

        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`
    }else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}
