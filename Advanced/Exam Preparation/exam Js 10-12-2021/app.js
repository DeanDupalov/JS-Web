window.addEventListener('load', solve);

function solve() {
    const receivedOrders = document.getElementById('received-orders');
    const completedOrders = document.getElementById('completed-orders');
    const clearBtn = document.querySelector('#completed-orders .clear-btn');
    clearBtn.addEventListener('click', clearHandler);

    const sendBtn = document.querySelector('#right form button');
    sendBtn.addEventListener('click', sendHandler);

    let typeInput = document.getElementById('type-product');
    let descriptionInput = document.getElementById('description');
    let nameInput = document.getElementById('client-name');
    let phoneInput = document.getElementById('client-phone');

    function sendHandler(e) {
        e.preventDefault()

        let type = typeInput.value;
        let description = descriptionInput.value;
        let name = nameInput.value;
        let phone = phoneInput.value;

        if (type === '' || description === '' || name === '' || phone === '') {
            return
        }

        let containerDiv = document.createElement('div');
        containerDiv.classList.add('container');

        let h2Element = document.createElement('h2');
        h2Element.textContent = `Product type for repair: ${type}`;

        let h3Element = document.createElement('h3');
        h3Element.textContent = `Client information: ${name}, ${phone}`;

        let h4Element = document.createElement('h4');
        h4Element.textContent = `Description of the problem: ${description}`;

        let startBtn = document.createElement('button');
        startBtn.classList.add('start-btn');
        startBtn.textContent = `Start repair`;
        startBtn.addEventListener('click', startHandler);

        let finishBtn = document.createElement('button');
        finishBtn.classList.add('finish-btn');
        finishBtn.textContent = `Finish repair`;
        finishBtn.disabled = true;
        finishBtn.addEventListener('click', finishHandler);

        containerDiv.appendChild(h2Element);
        containerDiv.appendChild(h3Element);
        containerDiv.appendChild(h4Element);
        containerDiv.appendChild(startBtn);
        containerDiv.appendChild(finishBtn);

        receivedOrders.appendChild(containerDiv);

        typeInput.value = '';
        descriptionInput.value = '';
        nameInput.value = '';
        phoneInput.value = '';

        function startHandler(e) {
            e.target.disabled = true;
            finishBtn.disabled = false;
        }
    }

    function finishHandler(e) {
        let container = e.target.parentElement;

        container.removeChild(container.querySelector('.start-btn'));
        container.removeChild(container.querySelector('.finish-btn'));

        completedOrders.appendChild(container);
    }

    function clearHandler(e) {

        let completedList = Array.from(document.querySelectorAll('#completed-orders .container'));
        completedList.forEach(c => c.remove())
    }
}