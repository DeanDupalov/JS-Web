window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin)
});

async function onLogin(e) {
    const url = 'http://localhost:3030/users/login'

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }
        const response = await fetch(url, options)
        if (response.ok !== true){
            const error = await response.json();
            throw new Error(error.message)
        }
        const data  = await response.json();
        const token = data.accessToken;

        localStorage.setItem('token', token);
        window.location = '/cookbook/lesson-02/index.html'
    }catch (error) {
        alert(error.message)
    }
}