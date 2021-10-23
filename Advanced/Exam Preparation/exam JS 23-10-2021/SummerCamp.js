class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {
            "child": 150,
            "student": 300,
            "collegian": 500
        };
        this.listOfParticipants = [];
        this.listOfNames = []
    }

    registerParticipant(name, condition, money) {

        if (Object.keys(this.priceForTheCamp).includes(condition) === false) {
            throw Error('Unsuccessful registration at the camp.')
        }

        let isRegistered = this.listOfParticipants.some((s) => s.name === name);
        if (isRegistered === true) {
            return `The ${name} is already registered at the camp.`
        }


        if (this.priceForTheCamp[condition] > money) {
            return 'The money is not enough to pay the stay at the camp.';
        }

        this.listOfParticipants.push({
            name: name,
            condition: condition,
            power: 100,
            wins: 0,
        })
        this.listOfNames.push(name);

        return `The ${name} was successfully registered.`
    }

    unregisterParticipant(name) {
        let isRegistered = this.listOfParticipants.some((s) => s.name === name);
        if (isRegistered === false) {
            throw Error(`The ${name} is not registered in the camp.`)
        }

        let currentParticipant = this.listOfParticipants.find((p) => p.name === name);
        let idxParticipant = this.listOfParticipants.indexOf(currentParticipant);
        this.listOfParticipants.splice(idxParticipant, 1);

        return `The ${name} removed successfully.`
    }

    timeToPlay(typeOfGame, ...participants) {
        const games = [
            'Battleship',
            'WaterBalloonFights',
        ]
        let game;
        let playerOneName = participants[0];
        const playerOne = this.listOfParticipants.find((s) => s.name === playerOneName);
        let playerTwoName;


        if (participants.length === 1) {
            game = games[0];
            if (this.listOfNames.includes(playerOneName) === false) {
                throw Error('Invalid entered name/s.')
            }
            playerOne.power += 20;
            return `The ${playerOne.name} successfully completed the game ${game}.`

        } else if (participants.length === 2) {
            game = games[1];
            let playerTwoName = participants[1];
            if (this.listOfNames.includes(playerOneName) === false || this.listOfNames.includes(playerTwoName) === false) {
                throw Error('Invalid entered name/s.')
            }
            const playerTwo = this.listOfParticipants.find((s) => s.name === playerTwoName);

            if (playerOne.condition !== playerTwo.condition) {
                throw Error(`Choose players with equal condition.`)
            }

            if (playerOne.power > playerTwo.power) {
                playerOne.wins += 1;
                return `The ${playerOne.name} is winner in the game ${game}.`
            } else if (playerTwo.power > playerOne.power) {
                playerTwo.wins += 1;
                return `The ${playerTwo.name} is winner in the game ${game}.`
            } else {
                return 'There is no winner.'
            }

        } else {
            return
        }


    }

    toString() {
        let result = [`${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`,]
        this.listOfParticipants
            .sort((a, b) => b.wins - a.wins)
            .forEach(s => result.push(`${s.name} - ${s.condition} - ${s.power} - ${s.wins}`))
        return result.join('\n');
    }

}

const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");


console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));

console.log(summerCamp.toString());




