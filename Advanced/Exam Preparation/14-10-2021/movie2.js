class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName;
        this.ticketPrice = Number(ticketPrice);
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

        let existScreening = this.screenings.find((s) => s.date === date && s.hall === hall);

        if (existScreening !== undefined){
            throw Error(`Sorry, ${hall} hall is not available on ${date}`)
        }

        this.screenings.push(screening);
        return`New screening of ${this.movieName} is added.`
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

        this._totalSoldTickets += soldTickets;
        let currentProfit = soldTickets * this.ticketPrice;
        this._totalProfit += currentProfit;

        this.screenings.splice(screeningIdx, 1)
        return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`
    }
    toString() {
        let result = [
            `${this.movieName} full information:`,
            `Total profit: ${this._totalProfit.toFixed(0)}$`,
            `Sold Tickets: ${this._totalSoldTickets}`
        ]
        if(this.screenings){
            result.push('Remaining film screenings:')
            this.screenings.sort((a, b) => a.hall.localeCompare(b.hall))
            this.screenings.forEach(m => {
                result.push(`${m.hall} - ${m.date} - ${m.description}`)
            });
        }else {
            result.push('No more screenings!')
        }
        return result.join('\n');
    }
}

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

