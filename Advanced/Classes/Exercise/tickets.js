function tickets(data, sortCriteria) {
    const result = [];

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }

        static compareDestination(a, b) {
            return a.destination.localeCompare(b.destination);
        }

        static comparePrice(a, b) {
            return a.price - b.price;
        }

        static compareStatus(a, b) {
            return a.status.localeCompare(b.status);
        }
    }

    data.forEach((el) => {
        result.push(new Ticket(...el.split('|')));
    })
    const criterias = {
        'destination': Ticket.compareDestination,
        'price': Ticket.comparePrice,
        'status': Ticket.compareStatus,

    }

    result.sort(criterias[sortCriteria]);
    return result;
}

// console.log(tickets(
//     ['Philadelphia|4.20|available',
//         'New York City|95.99|available',
//         'New York City|1.99|sold',
//         'Boston|126.20|departed'],
//     'price'
// ))

// console.log(tickets(
//     ['Philadelphia|94.20|available',
//         'New York City|95.99|available',
//         'New York City|95.99|sold',
//         'Boston|126.20|departed'],
//     'status'
//
// ))

console.log(tickets(
    ['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'price')
)