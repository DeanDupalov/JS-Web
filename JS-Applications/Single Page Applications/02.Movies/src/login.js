import {showView} from './dom.js';
import {showHome} from './home.js';

const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin)
section.remove();

export function showLogin() {
    showView(section);
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try{
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })

        });

        if(response.ok === false){
            const error = await response.json()
            throw new Error(error.message);
        }
        const data = await response.json()
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            token: data.accessToken,
            id: data._id,
        }))

        form.reset()
        showHome()
    }catch (err) {
        alert(err.message)
    }
}