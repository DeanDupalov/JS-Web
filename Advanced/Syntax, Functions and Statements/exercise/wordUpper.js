function wordToUpper(text) {
    const textArray = text.split(' ')

    let result = [];

    for (let word of textArray) {
        result.push(word.toUpperCase());
    }

    return result;
}


console.log(wordToUpper('Hi, how are you?'));