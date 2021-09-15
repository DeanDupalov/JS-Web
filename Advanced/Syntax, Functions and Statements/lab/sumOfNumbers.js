function solve(n, m) {
    let numOne = Number(n);
    let numTwo = Number(m);


    let result = 0;
    for (let i = numOne; i <= numTwo; i++) {
        result += i
    }
    return result
}


console.log(solve(1, 5));

