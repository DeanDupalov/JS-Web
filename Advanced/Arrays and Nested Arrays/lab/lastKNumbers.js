function solve(n, k) {
    const result = [1, 1];

    while (result.length < n) {
        let temp = 0;
        for (let i = 1; i <= k; i++) {
            if (i > result.length){
                continue;
            }else{
                temp += result[result.length - i]; 
            }
        }
        result.push(temp);
    }
    return result;
}


console.log(solve(1, 1));
// console.log(solve(8, 2));