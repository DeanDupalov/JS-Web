const {Person} = require('./Person');


function getPersons() {

    const result = [];
    const data = [
        ['Anna', 'Simpson', 22, 'anna@yahoo.com'],
        ['SoftUni'],
        ['Stephan', 'Johnson', 25,],
        ['Gabriel','Peterson', 24, 'g.p@gmail.com']
    ]
    data.forEach((el) => {
        result.push(new Person(...el));
    })
    return result
}

console.log(getPersons())