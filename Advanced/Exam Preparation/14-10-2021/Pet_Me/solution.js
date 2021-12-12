function solve() {
    const fields = document.querySelectorAll('#container input');
    const addButton = document.querySelector('#container button');

    let adoptionList = document.querySelector('#adoption ul');
    let adoptedList = document.querySelector('#adopted ul');


    addButton.addEventListener('click', addPet)
    const input = {
        name: fields[0],
        age: fields[1],
        kind: fields[2],
        owner: fields[3],
    }

    function clearInput(inputObj) {
        for (let key in inputObj) {
            inputObj[key].value = ''
        }
    }

    function addPet(e) {
        e.preventDefault();
        const name = input.name.value.trim();
        const age = Number(input.age.value.trim())
        const kind = input.kind.value.trim()
        const owner = input.owner.value.trim()

        if (name === '' || age === '' || Number.isNaN(age) || kind === '' || owner === '') {
            return;
        }

        const li = document.createElement('li');
        const paragraph = document.createElement('p');
        paragraph.innerHTML = `<strong>${name}</strong> is a <strong>${age}</strong> year old <strong>${kind}</strong>`
        const spanOwner = document.createElement('span');
        spanOwner.textContent = `Owner: ${owner}`
        const contactBtn = document.createElement('button');
        contactBtn.textContent = 'Contact with owner'

        li.appendChild(paragraph);
        li.appendChild(spanOwner);
        li.appendChild(contactBtn);
        adoptionList.appendChild(li);

        clearInput(input);

    }

    adoptionList.addEventListener('click', contactOwner);

    function contactOwner(e) {

        e.preventDefault();
        if (e.target.nodeName === "BUTTON" && e.target.textContent === 'Contact with owner') {
            const div = document.createElement('div');
            const newOwnerInput = document.createElement('input');
            newOwnerInput.placeholder = 'Enter your names'
            const takeBtn = document.createElement('button');
            takeBtn.textContent = 'Yes! I take it!'

            div.appendChild(newOwnerInput);
            div.appendChild(takeBtn);
            const parentEl = e.target.parentNode;

            const oldBtn = parentEl.children[2];

            parentEl.removeChild(oldBtn);

            parentEl.appendChild(div);
        } else if (e.target.nodeName === "BUTTON" && e.target.textContent === 'Yes! I take it!') {

            const newOwnerName = e.target.parentNode.children[0].value.trim()
            if (newOwnerName === '') {
                return;
            }

            const dogLi = adoptionList.removeChild(e.target.parentNode.parentNode);
            dogLi.children[1].textContent = `New Owner: ${newOwnerName}`;
            dogLi.removeChild(dogLi.children[2]);
            const newBtn = document.createElement('button');
            newBtn.textContent = 'Checked'
            dogLi.appendChild(newBtn)

            adoptedList.appendChild(dogLi);
        }

    }

    adoptedList.addEventListener('click', deleteDog);

    function deleteDog(e) {
        if (e.target.nodeName === "BUTTON") {
            adoptedList.removeChild(e.target.parentNode)

        }
    }

}

// addEventLis('click', funcName.bind(null, pet, input) предаваме референция към функцията от др функция.
// Предаваме си я надолу по веригата