window.addEventListener('load', solve);

function solve() {
    const addBtn = document.querySelector('form button');
    const [modelInput, yearInput, priceInput] = document.querySelectorAll('input');
    const descriptionInput = document.querySelector('textarea');

    let furnitureList = document.getElementById('furniture-list');
    addBtn.addEventListener('click', addFurniture)

    let total = 0;
    function addFurniture(e) {
        e.preventDefault();
        const model = modelInput.value.trim();
        const year = Number(yearInput.value.trim());
        const description = descriptionInput.value.trim()
        const price = Number(priceInput.value.trim());


        if (model === '' || Number.isNaN(year) || year === '' || year <= 0 || description === '' || Number.isNaN(price) || price === '' || price <= 0) {
            return;
        }

        const moreBtn = create('button', {}, 'More Info');
        moreBtn.classList.add('moreBtn');
        const buyBtn = create('button', {}, 'Buy it');
        buyBtn.classList.add('buyBtn');

        const furnitureInfo = create('tr', {class: 'info'},
            create('td', {}, `${model}`),
            create('td', {}, `${price.toFixed(2)}`),
            create('td', {}, moreBtn, buyBtn),
        )
        furnitureInfo.classList.add('info');
        const tdDescription = create('td', {}, `Description: ${description}`)
        tdDescription.setAttribute('colspan', 3)
        const furnitureHide = create('tr', {},
            create('td', {}, `Year: ${year}`),
            tdDescription
        )
        furnitureInfo.classList.add('info');
        furnitureHide.classList.add('hide');


        moreBtn.addEventListener('click', moreInfo);
        buyBtn.addEventListener('click', buyItem);

        function moreInfo(e) {
            if(e.target.textContent === 'More Info'){
                moreBtn.textContent = 'Less Info';
                furnitureHide.setAttribute('style', 'display: contents')
            }else {
                moreBtn.textContent = 'More Info';
                furnitureHide.setAttribute('style', 'display: none')
            }

        }
        function buyItem(e) {
            let totalTd = document.getElementsByClassName('total-price')[0];
            total += price;
            totalTd.textContent = total.toFixed(2);
            furnitureInfo.remove();
            furnitureHide.remove();

        }


        furnitureList.appendChild(furnitureInfo);
        furnitureList.appendChild(furnitureHide);

        modelInput.value = '';
        yearInput.value = '';
        descriptionInput.value = '';
        priceInput.value = '';


    }

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
}
