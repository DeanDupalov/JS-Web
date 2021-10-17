class Movie {
    constructor(name, price) {
        this.movieName = name;
        this.ticketPrice = Number(price);
        this.screenings = [];
        this._totalProfit = 0;
        this._totalSoldTickets = 0;
    }

    newScreening(date, hall, description) {
        let screening = {
            date,
            hall,
            description,

        }

        for (const s of this.screenings) {
            if (s.date === date && s.hall === hall) {
                throw Error(`Sorry, ${hall} hall is not available on ${date}`)
            }
        }
        this.screenings.push(screening);
        return `New screening of ${this.movieName} is added.`
    }

    endScreening(date, hall, soldTickets) {
        let screeningIdx;


        for (let i = 0; i < this.screenings.length; i++) {
            const s = this.screenings[i]
            if (s.date === date && s.hall === hall) {
                screeningIdx = i
            }
        }
        if (screeningIdx === undefined) {
            throw Error(`Sorry, there is no such screening for ${this.movieName} movie.`)
        }

        let profit = soldTickets * this.ticketPrice;
        this._totalProfit += profit;
        this._totalSoldTickets += soldTickets;
        this.screenings.splice(screeningIdx, 1);
        return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${profit}`

    }

    toString() {
        const result = [
            `${this.movieName} full information:`,
            `Total profit: ${this._totalProfit.toFixed(0)}$`,
            `Sold Tickets: ${this._totalSoldTickets}`
        ];

        if (this.screenings.length === 0) {
            result.push('No more screenings!');
        } else {
            result.push('Remaining film screenings:');
            this.screenings.sort((a, b) => a.hall.localeCompare(b.hall));
            this.screenings.forEach(
                s => result.push(`${s.hall} - ${s.date} - ${s.description}`)
            )
        }

        return result.join('\n');

    }

    // toString() {
    //     let result = `${this.movieName} full information:\nTotal profit: ${this._totalProfit.toFixed(0)}$\nSold Tickets: ${this._totalSoldTickets}\n`
    //     if (this.screenings) {
    //         this.screenings.sort((a, b) => {
    //             return a.hall.localeCompare(b.hall);
    //         })
    //         result += "Remaining film screenings:\n";
    //         for (const s of this.screenings) {
    //             result += `${s.hall} - ${s.date} - ${s.description}\n`
    //         }
    //
    //     } else {
    //         result += 'No more screenings!\n';
    //     }
    //
    //
    //     return result.slice(0, -1);
    // }
}


// let m = new Movie('Wonder Woman 1984', '10.00');
// m.newScreening('October 2, 2020', 'IMAX 3D', `3D`);
// m.newScreening('October 3, 2020', 'Main', `regular`);
// m.newScreening('October 4, 2020', 'IMAX 3D', `3D`);
// m.endScreening('October 2, 2020', 'IMAX 3D', 150);
// m.endScreening('October 3, 2020', 'Main', 78);
// console.log(m.toString());

let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', `regular`);
m.newScreening('October 5, 2020', 'Main', `regular`);
m.newScreening('October 3, 2020', '235', `regular`);
m.newScreening('October 4, 2020', 'Main', `regular`);
console.log(m.toString());
