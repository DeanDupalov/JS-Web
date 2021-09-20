function negativePositive(numbers) {
    result = [];
    for (let el of numbers) {
        if (el >= 0) {
            result.push(el);
        } else {
            result.unshift(el);
        }
    }

    return result.join('\n');

}


console.log(negativePositive([7, -2, 8, 9]));