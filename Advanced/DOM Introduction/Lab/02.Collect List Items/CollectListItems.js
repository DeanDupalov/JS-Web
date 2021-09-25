function extractText() {
    text = document.querySelectorAll('#items li');
    result = document.getElementById('result');

    for (let el of Array.from(text)){
        result.value += el.textContent + '\n'
    }
}