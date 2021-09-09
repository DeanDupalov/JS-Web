function sumDigits(numbers) {
    let result = 0;
    let numToString = String(numbers);
    for (let i = 0; i < numToString.length; i++) {
        result += Number(numToString[i]);
    }
    console.log(result)
}


sumDigits(245678)