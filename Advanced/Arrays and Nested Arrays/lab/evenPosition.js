function solve(params) {
    return params.filter((v, i) => i % 2 ==0).join(' ');
}


console.log(solve(['20', '30', '40', '50', '60']));
console.log(solve(['5', '10']));