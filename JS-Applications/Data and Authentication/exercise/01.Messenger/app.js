function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', creatMessage);

    const refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', displayMessages)

    const messages = document.getElementById('messages');
    const name = document.querySelector('input[name="author"]');
    const messageContent = document.querySelector('input[name="content"]');

    displayMessages()

    let message = {
        author: name.value,
        content: messageContent.value,
    }

    function creatMessage(e) {
        addMessage(url, message);

    }

    async function displayMessages(e) {
        let result = [];
        const data = await getMessages(url);
        Object.values(data).forEach(m => {
            result.push(`${m.author}: ${m.content}`)
        });
        messages.textContent = result.join('\n');
    }

}

async function addMessage(url, message) {
    try {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                // 'X-Authorization': token,
            },
            body: JSON.stringify(message),
        }
        const response = await fetch(url, options);

        if (response.ok !== true) {
            const error = await response.json();
            throw new Error(error.message)
        }

        await response.json();
    } catch (error) {
        alert(error.message);
    }
}

async function getMessages(url) {
    try {
        const response = await fetch(url);

        if (response.ok !== true) {
            const error = await response.json();
            throw new Error(error.message)
        }
        return await response.json();

    } catch (error) {
        alert(error.message);
    }
}

attachEvents();