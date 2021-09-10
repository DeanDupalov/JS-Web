function solve(numbers) {
    let result = [];
    let isTop = false

    for (let i = 0; i < numbers.length; i++) {
        if (isTop) {
            break;
        }
        if (i === numbers.length - 1) {
            result = [numbers[i]];
            break;
        }else {
            result = [numbers[i]]
        }
        
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[j] >= numbers[i]) {
                result = [numbers[j]];
                break;
            } else {
                result.push(numbers[j]);
                if (j == numbers.length-1){
                    isTop = true
                }
            }
        }
    }
    console.log(result.join(' '))

}

solve([1, 4, 3, 2]);
solve([14, 24, 3, 19, 15, 17]);
solve([41, 41, 34, 20]);
solve([27, 19, 42, 2, 13, 45, 48]);