function solve() {
    const stopInfoElement = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot',
    };

    async function depart() {
        departBtn.disabled = true;
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`
        try {
            const response = await fetch(url);
            if (response.status !== 200) {
                throw new Error()
            }
            stop = await response.json();

            stopInfoElement.textContent = `Next stop ${stop.name}`;


            arriveBtn.disabled = false;


        } catch (error) {
            departBtn.disabled = 'disabled';
            stopInfoElement.textContent = 'Error'
        }
    }

    function arrive() {

        stopInfoElement.textContent = `Arriving at ${stop.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();


// async function arrive() {
//     try {
//         const response = await fetch(url + currentStop);
//         if (response.status !== 200) {
//             throw new Error()
//         }
//         let data = await response.json();
//
//         stopInfoElement.textContent =`Arriving at ${nextStop}`;
//         currentStop = data.next;
//
//         arriveBtn.disabled = 'disabled';
//         departBtn.removeAttribute('disabled')
//
//     } catch (error) {
//         arriveBtn.disabled = 'disabled';
//         stopInfoElement.textContent = 'Error'
//     }
// }