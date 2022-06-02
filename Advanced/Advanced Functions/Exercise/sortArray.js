function sortArray(arr, order) {

    const sortHelper = {
        'asc': (a, b) => a - b,
        'desc': (a, b) => b - a,
    }

    return arr.sort(sortHelper[order])
}

// console.log(sortArray([14, 7, 17, 6, 8], 'asc'));
// console.log(sortArray([14, 7, 17, 6, 8], 'desc'));


function digitize(n) {
    let arr = Array.from(String(n), Number);
    let result =  arr.sort((a, b) => b - a);
    return result;
}

console.log(digitize());