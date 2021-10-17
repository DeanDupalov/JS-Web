function create(type, attr, ...content) {
    const element = document.createElement(type);

    for (let prop in attr) {
        element[prop] = attr[prop];
    }

    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item)
    }
    return element;
}

const input = {
    name: 'Tom',
    age: 3,
    kind: 'Cat',
    owner: 'Dean',
}
const contactBtn = create('button', {}, 'Contact with owner');

const pet = create('li', {},
    create('p', {},
        create('strong', {}, input['name']),
        ' is a ',
        create('strong', {}, input['age']),
        ' year old ',
        create('strong', {}, input['kind']),
    ),
    create('span', {}, `Owner: ${input['owner']}`),
    contactBtn,
)


let screeningIdx;
console.log(screeningIdx)