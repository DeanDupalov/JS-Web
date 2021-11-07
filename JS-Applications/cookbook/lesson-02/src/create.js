window.addEventListener('load', async () => {
    const token = localStorage.getItem('token');
    if (token == null){
        window.location = '/cookbook/lesson-02/login.html'
    }
    const form = document.querySelector('form');
    form.addEventListener('submit', onCreate)
});

async function onCreate(e) {
    const url = 'http://localhost:3030/data/recipes'

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get('name').trim();
    const image = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    try {
        const token = localStorage.getItem('token');
        if (token == null){
            window.location = '/cookbook/lesson-02/login.html'
            return;
        }
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
            body: JSON.stringify({
                name,
                image,
                ingredients,
                steps
            })
        }
        const response = await fetch(url, options);

        if (response.ok !== true) {
            const error = await response.json();
            throw new Error(error.message)
        }
        await response.json();
        window.location = '/cookbook/lesson-02/index.html'
    } catch (error) {
        alert(error.message)
    }
}