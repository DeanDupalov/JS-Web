window.addEventListener('load', solution);

function solution() {
    const blockDiv = document.getElementById('block');
    const submitBtn = document.getElementById('submitBTN');
    const editBtn = document.getElementById('editBTN');
    const continueBtn = document.getElementById('continueBTN');

    submitBtn.addEventListener('click', onClick);
    editBtn.addEventListener('click', editHandler);
    continueBtn.addEventListener('click', continueHandler);

    const previewList = document.getElementById('infoPreview');

    const fullNameInput = document.getElementById('fname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const postCodeInput = document.getElementById('code');

    let editaData = [];


    function onClick(e) {
        let isSubmit = true;
        buttonsDisabledHandler(isSubmit);

        const name = fullNameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const address = addressInput.value;
        const postCode = postCodeInput.value;

        editaData.push(name, email, phone, address, postCode);

        if (name === '' || email === '') {
            return
        }

        let nameLi = document.createElement('li');
        nameLi.textContent = `Full Name: ${name}`;

        let emailLi = document.createElement('li');
        emailLi.textContent = `Email: ${email}`;

        let phoneLi = document.createElement('li');
        phoneLi.textContent = `Phone Number: ${phone}`;

        let addressLi = document.createElement('li');
        addressLi.textContent = `Address: ${address}`;

        let postCodeLi = document.createElement('li');
        postCodeLi.textContent = `Postal Code: ${postCode}`;


        for (const el of editaData) {
            if (el !== ''){

            }
        }

        previewList.appendChild(nameLi);
        previewList.appendChild(emailLi);
        phone ? previewList.appendChild(phoneLi) : null;
        address ? previewList.appendChild(addressLi) : null;
        postCode ? previewList.appendChild(postCodeLi): null;


        fullNameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        addressInput.value = '';
        postCodeInput.value = '';

    }

    function editHandler() {
        let isSubmit = false;
        buttonsDisabledHandler(isSubmit);
        let [name, email, phone, address, postCode] = editaData;
        fullNameInput.value = name;
        emailInput.value = email;
        phoneInput.value = phone;
        addressInput.value = address;
        postCodeInput.value = postCode;

        editaData = [];
        previewList.replaceChildren();

    }

    function continueHandler() {
        let heading = document.createElement('h3');
        heading.textContent = `Thank you for your reservation`;
        blockDiv.replaceChildren()
        blockDiv.appendChild(heading);
    }

    function buttonsDisabledHandler(isSubmit) {
        if (isSubmit) {
            submitBtn.disabled = true;
            editBtn.disabled = false;
            continueBtn.disabled = false;
        } else {
            submitBtn.disabled = false;
            editBtn.disabled = true;
            continueBtn.disabled = true;
        }
    }

}
