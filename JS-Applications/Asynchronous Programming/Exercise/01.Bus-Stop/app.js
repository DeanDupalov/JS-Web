async function getInfo() {
    let divStopName = document.getElementById('stopName');
    let ulBuses = document.getElementById('buses');

    let stopId = document.getElementById('stopId').value;

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`

    try {
        divStopName.textContent = '';
        ulBuses.innerHTML = '';

        const response = await fetch(url);

        if (response.status !== 200){
            throw new Error('Stop Id not found');
        }

        const data = await response.json();

        divStopName.textContent = data.name;

        for(let busId in data.buses){
            let li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${data.buses[busId]} minutes`
            ulBuses.appendChild(li);
        }
    } catch (error) {

        divStopName.textContent = '';
        ulBuses.innerHTML = '';
        divStopName.textContent = 'Error';
    }

}