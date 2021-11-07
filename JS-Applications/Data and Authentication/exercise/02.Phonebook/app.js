function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', displayPhonebook);
    document.getElementById('btnCreate').addEventListener('click', addContact);
    let phonebook = document.getElementById('phonebook');
    phonebook.addEventListener('click', deleteNumber);

    async function displayPhonebook() {
        const phoneNumbersList = await loadPhonebook();
        phonebook.innerHTML = '';
        phoneNumbersList.forEach(pn => {
            let liElement = document.createElement('li');
            let deleteBtn = document.createElement('button');

            deleteBtn.textContent = 'DELETE'
            deleteBtn.setAttribute('data-id', pn._id)

            liElement.textContent = `${pn.person}: ${pn.phone}`;
            liElement.id = pn._id;
            liElement.appendChild(deleteBtn);
            phonebook.appendChild(liElement);
        })
    }

    async function deleteNumber(e) {
        if (e.target.tagName === 'BUTTON') {
            let id = e.target.dataset.id;
            let contact = await deleteData(id);
            phonebook.removeChild(e.target.parentElement);
        }
    }

    async function addContact() {
        let personInput = document.getElementById('person');
        let phoneInput = document.getElementById('phone');
        const contact = {
            person: personInput.value,
            phone: phoneInput.value,
        }
        console.log(contact)
        await createContact(contact)

        await displayPhonebook();
        personInput.value = '';
        phoneInput.value = '';
    }
}

const url = 'http://localhost:3030/jsonstore/phonebook/'

async function loadPhonebook() {
    const response = await fetch(url);
    const data = await response.json();

    return Object.values(data);
}

async function deleteData(id) {
    const newUrl = url + id;

    const options = {
        method: 'delete',
    }

    const response = await fetch(newUrl, options);
    return await response.json();
}

async function createContact(contact) {
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    }
    const response = await fetch(url, options);
    return await response.json();
}

attachEvents();