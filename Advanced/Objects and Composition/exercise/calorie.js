function calorieObj(infoStr) {
    const result = {}
    for (let i = 0; i < infoStr.length; i+= 2) {
        result[infoStr[i]] = Number(infoStr[i + 1])

    }
    return result;
}


console.log(calorieObj(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']));
console.log(calorieObj(['Potato', '93', 'Skyr', '63', 'Cucumber', '18', 'Milk', '42']));