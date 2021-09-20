function sumFirstLast(numbers) {
    return Number(numbers[0]) + Number(numbers[numbers.length - 1]);
}


console.log(sumFirstLast(['20', '30', '40']));
console.log(sumFirstLast(['5', '10']));