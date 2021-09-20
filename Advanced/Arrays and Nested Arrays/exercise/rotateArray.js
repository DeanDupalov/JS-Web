function rotate(arrString, rotations) {
    for (let i = 0; i < rotations; i++) {
        const el = arrString.pop();
        arrString.unshift(el);
    }

    return arrString.join(' ');
}


console.log(rotate(
    ['1',
    '2',
    '3',
    '4'],
    2

));

console.log(rotate(
    ['Banana',
    'Orange',
    'Coconut',
    'Apple'],
    15

));