class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = []
    }

    _findCar(carNumber) {
        for (const car of this.vehicles) {
            if (car.carNumber === carNumber) {
                return car
            }
        }
        return undefined
    }

    addCar(carModel, carNumber) {
        if (this.capacity === 0) {
            throw Error("Not enough parking space.");
        }
        this.vehicles.push(
            {
                carModel,
                carNumber,
                payed: false,
            }
        )
        this.capacity -= 1;
        return `The ${carModel}, with a registration number ${carNumber}, parked.`;
    }

    removeCar(carNumber) {
        const car = this._findCar(carNumber)
        if (car === undefined) {
            throw Error("The car, you're looking for, is not found.");
        }
        if (car.carNumber === carNumber && car['payed'] === true) {
            this.capacity += 1;
            return `${carNumber} left the parking lot.`;

        } else if (car.carNumber === carNumber && car['payed'] === false) {
            return `${carNumber} needs to pay before leaving the parking lot.`;
        }

    }

    pay(carNumber) {
        const car = this._findCar(carNumber)
        if (car === undefined) {
            throw Error(`${carNumber} is not in the parking lot.`);
        }
        if (car['payed'] === true) {
            throw Error(`${carNumber}'s driver has already payed his ticket.`);
        }
        car['payed'] = true;
        return `${carNumber}'s driver successfully payed for his stay.`;

    }

    getStatistics(carNumber = '') {
        if (carNumber === '') {
            let result = [`The Parking Lot has ${this.capacity} empty spots left.`,]
            this.vehicles
                .sort((a, b) => {
                    a.carModel.localeCompare(b.carModel)
                })
                .forEach(c => {
                    result.push(`${c.carModel} == ${c.carNumber} - ${c['payed'] ? 'Has payed' : 'Not payed'}`)
                })
            return result.join('\n');
        }

        const car = this._findCar(carNumber);

        return `${car.carModel} == ${car.carNumber} - ${car['payed'] ? 'Has payed' : 'Not payed'}`
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.addCar("Volvo t600", "TX3691CAb"));
console.log(parking.addCar("Volvo t600", "TX3691CAc"));
console.log(parking.addCar("Volvo t600", "TX3691CAd"));
console.log(parking.getStatistics());

