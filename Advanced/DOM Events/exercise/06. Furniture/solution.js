function solve() {

    const table = document.querySelector('table.table tbody')
    const [generateBtn, buyBtn] = document.querySelectorAll('button');
    const [input, output] = document.querySelectorAll('textarea');
    generateBtn.addEventListener('click', generateHandler);
    buyBtn.addEventListener('click', byuHandler)


    function generateHandler(e) {
        const data = JSON.parse(input.value);

        for (let item of data) {
            const row = document.createElement('tr');

            const imgCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const priceCell = document.createElement('td');
            const decFactorCell = document.createElement('td');
            const checkCell = document.createElement('td');

            const img = document.createElement('img');
            img.src = item.img;
            imgCell.appendChild(img);

            const nameP = document.createElement('p');
            nameP.textContent = item.name;
            nameCell.appendChild(nameP);


            const priceP = document.createElement('p');
            priceP.textContent = item.price;
            priceCell.appendChild(priceP);

            const decP = document.createElement('p');
            decP.textContent = item.decFactor;
            decFactorCell.appendChild(decP)

            const check = document.createElement('input');
            check.type = 'checkbox';
            checkCell.appendChild(check);


            row.appendChild(imgCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(decFactorCell);
            row.appendChild(checkCell);

            table.appendChild(row);
        }
    }

    function byuHandler(e) {
        let result = ''
        const checkBoxes = [...table.querySelectorAll('tbody input[type="checkbox"]')];
        const bought = checkBoxes.filter((el) => el.checked).map(el => el.parentElement.parentElement);

        const names = bought.map(el => el.children[1].textContent);
        result += `Bought furniture: ${names.join(', ')}\n`

        const total = bought.map(el => Number(el.children[2].textContent)).reduce((a, b) => a + b)
        result += `Total price: ${total.toFixed(2)}\n`

        const avgFactor = (bought
            .map(el => Number(el.children[3].textContent))
            .reduce((a, b) => a + b))
            / bought.map(el => Number(el.children[3].textContent)).length;

        result += `Average decoration factor: ${avgFactor}`

        output.textContent = result;
    }
}