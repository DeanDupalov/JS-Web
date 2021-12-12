function solve() {
    const addBtn = document.querySelector('form #container button');
    const adoptionLIst = document.querySelector('#adoption ul');
    const adoptedLIst = document.querySelector('#adopted ul');
    addBtn.addEventListener('click', onClick);

    function onClick(e) {
        e.preventDefault()
        const [nameInput, ageInput, kindInput, ownerInput] = document.querySelectorAll('form #container input');

        const name = nameInput.value;
        const age = Number(ageInput.value);
        const kind = kindInput.value;
        const owner = ownerInput.value;

        if (name === '' || Number.isNaN(age) || kind === '' || owner === '') {
            return;
        }

        let liPet = createPet(name, age, kind, owner)
        adoptionLIst.appendChild(liPet)

        function createPet(name, age, kind, owner, ownerType='Owner') {
            let liElement = document.createElement('li');
            let paraElement = document.createElement('p');

            paraElement.innerHTML = `<strong>${name}</strong> is a <strong>${age}</strong> year old <strong>${kind}</strong>`

            let strongElement = document.createElement('span');
            strongElement.textContent = `${ownerType}: ${owner}`

            let contactBtn = document.createElement('button');
            contactBtn.textContent = 'Contact with owner';
            contactBtn.addEventListener('click', contactHandler)

            liElement.appendChild(paraElement);
            liElement.appendChild(strongElement);
            liElement.appendChild(contactBtn)

            return liElement
        }

        function contactHandler(e) {
            let divElement = document.createElement('div');
            let inputElement = document.createElement('input');


            if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Contact with owner') {
                let liParent = e.target.parentElement;

                inputElement.placeholder = 'Enter your names';
                e.target.textContent = 'Yes! I take it!';

                divElement.appendChild(inputElement);
                divElement.appendChild(e.target);
                liParent.appendChild(divElement);

            } else if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Yes! I take it!') {
                let liParent = e.target.parentElement.parentElement;
                e.target.textContent = 'Checked';

                let newOwnerNameInput = e.target.parentElement.firstElementChild;
                let newName = newOwnerNameInput.value;

                liParent.removeChild(e.target.parentElement);
                let spanNewName = document.createElement('span');
                spanNewName.textContent = `${newName}`;

                liParent.appendChild(spanNewName)
                liParent.appendChild(e.target);

                adoptedLIst.appendChild(liParent);
            } else if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Checked'){
                e.target.parentElement.remove();
            }

        }

        nameInput.value = '';
        ageInput.value = '';
        kindInput.value = '';
        ownerInput.value = '';

    }


}

