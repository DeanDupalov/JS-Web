function townPopulation(townsAsString) {
    register = {}
    for (let data of townsAsString) {
        const [town, population] = data.split(' <-> ');

        if (register[town] == undefined) {
            register[town] = Number(population);
        } else {
            register[town] += Number(population);
        }

    }
    for (const [name, population] of Object.entries(register)) {
        console.log(`${name} : ${population}`);
    }
}
townPopulation(
    ['Sofia <-> 1200000',
        'Montana <-> 20000',
        'New York <-> 10000000',
        'Washington <-> 2345000',
        'Las Vegas <-> 1000000']
);
townPopulation(
    ['Istanbul <-> 100000',
        'Honk Kong <-> 2100004',
        'Jerusalem <-> 2352344',
        'Mexico City <-> 23401925',
        'Istanbul <-> 1000']

)