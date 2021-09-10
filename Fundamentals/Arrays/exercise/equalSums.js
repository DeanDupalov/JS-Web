function solve(numbers) {

    if (numbers.length === 1) {
        return 0;
    } else if (numbers.length === 2) {
        return 'no';
    }


    function getLeftSum(index, arr) {
        let result = 0;
        for (let i = index - 1; i >= 0; i--) {
            result += arr[i];
        }
        return result;
    }
    function getRightSum(index, arr) {
        let result = 0;
        for (let i = index + 1; i < arr.length; i++) {
            result += arr[i];
        }
        return result;
    }
    for (let i = 1; i < numbers.length - 1; i++) {
        let leftSum = getLeftSum(i, numbers);
        let rightSum = getRightSum(i, numbers);

        if (leftSum === rightSum) {
            return i;
        }
    }

    return 'no';

}


console.log(solve([1, 2, 3, 3]))
console.log(solve([1, 2]))
console.log(solve([1]))
console.log(solve([1, 2, 3]))
console.log(solve([10, 5, 5, 99, 3, 4, 2, 5, 1, 1, 4]))