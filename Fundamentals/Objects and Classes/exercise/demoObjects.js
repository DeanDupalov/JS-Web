let person = {
    name: 'Dean',
    books: ['One, Two'],
};


let numbers = [1, 2, 3, 4, 5];


function solve(a, b, ...rest) {
    console.log(a);
    console.log(b);
    console.log(rest);
}


solve(...numbers);