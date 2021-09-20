function findTwoSmallest(numbers) {
    numbers.sort((a, b) => a - b);
    return numbers.slice(0, 2).join(' ');
}



console.log(findTwoSmallest([30, 15, 50, 5]));
console.log(findTwoSmallest([3, 0, 10, 4, 7, 3]));