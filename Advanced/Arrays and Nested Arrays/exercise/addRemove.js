function solve(commands) {
    const result = [];
    let number = 1
    for (let command of commands) {
        if (command === 'add') {
            result.push(number);
        } else if (command === 'remove') {
            result.pop();
        }

        number += 1
    }
    
    return ((result.length > 0) ? result.join('\n') : 'Empty');

}


// console.log(solve(
//     ['add',
//         'add',
//         'add',
//         'add']

// ));
// console.log('-----------');
// console.log(solve(
//     ['add',
//         'add',
//         'remove',
//         'add',
//         'add']

// ));


// console.log('-----------');

console.log(solve(
    ['remove',
    'remove',
    'remove']
));