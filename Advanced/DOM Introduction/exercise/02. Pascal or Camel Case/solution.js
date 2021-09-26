function solve() {
  const parser = {
    "Camel Case": convertCamel,
    "Pascal Case": convertPascal
  }
  function convertCamel(str) {
    return str
      .replace(/[^a-z0-9]/gi, ' ')
      .toLowerCase()
      .split(' ')
      .map((el, ind) => ind === 0 ? el : el[0].toUpperCase() + el.substring(1, el.length))
      .join('');
  }

  function convertPascal(text) {
    textLower = text.toLowerCase()
    const arrText = textLower.split(' ');
    const result = [];
    for (let word of arrText) {
      let newWord = word.charAt().toUpperCase() + word.slice(1);
      result.push(newWord);
    }

    return result.join('');

  }

  let textInput = document.getElementById('text').value;
  let convention = document.getElementById('naming-convention').value;
  if (convention in parser === false){
    return document.getElementById('result').textContent = 'Error!';
  }
  
  return document.getElementById('result').innerText = parser[convention](textInput);

}
