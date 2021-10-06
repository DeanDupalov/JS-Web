function infoArgs(...args) {
    const data = {};
    const summary = {};

    args.forEach(el => {
            let key = typeof el;
            data[el] = key;

            (key in summary) ? summary[key] += 1 : summary[key] = 1;
        }
    )

    for (let key in data) {
        console.log(`${data[key]}: ${key}`)
    }

    const keys = Object.keys(summary);


    keys.sort(function (a, b) {
        return b - a;
    });


    for (let i = 0; i < keys.length; i++) {
        console.log(`${keys[i]} = ${summary[keys[i]]}`);
    }
}

// infoArgs({ name: 'bob'}, 3.333, 9.999);
//
// console.log('*****************************');

infoArgs('cat', 42, function () { console.log('Hello world!'); })