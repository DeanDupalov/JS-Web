class Contact {
    constructor(firstName, lastName, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this._online = false
    }

    set online(value) {
        if(this.divTitle && value === false){
            this.divTitle.classList.remove('online');
        }else {
            this.divTitle.classList.add('online');
        }
        this._online = value
    }

    render(id) {
        const article = document.createElement('article');

        this.divTitle = document.createElement('div');
        this.divTitle.classList.add('title');
        this.divTitle.innerHTML = `${this.firstName} ${this.lastName}`;
        const button = document.createElement('button');
        button.innerHTML = '&#8505;';
        this.divTitle.appendChild(button);

        const divInfo = document.createElement('div');
        divInfo.classList.add('info');
        divInfo.style.display = 'none';

        const spanPhone = document.createElement('span');
        spanPhone.innerHTML = `&phone; ${this.phoneNumber}`;
        const spanEmail = document.createElement('span');
        spanEmail.innerHTML = `&#9993; ${this.email}`;
        divInfo.appendChild(spanPhone);
        divInfo.appendChild(spanEmail);
        article.appendChild(this.divTitle);
        article.appendChild(divInfo);
        button.addEventListener('click', () => {
            divInfo.style.display = divInfo.style.display === 'none' ? 'block' : 'none';
        })
        document.getElementById(id).appendChild(article);
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];
contacts.forEach(c => c.render('main'));

// After 1 second, change the online status to true
setTimeout(() => contacts[1].online = true, 2000);
