function solve() {
  let textInput = document.getElementById('input').value.split('.').filter((el) => el != '');
  let output = document.getElementById('output');
  let finalString = ''
  let text = '';
  let count = 0;

  for (let i = 0; i < textInput.length; i++) {
    if (count === 3) {
      count = 0;
      finalString += `<p>${text}.</p>`;
      text = '';
    }
    text += textInput[i];
    count++;

  }
  finalString += `<p>${text}.</p>`;
 
  output.innerHTML = finalString;

}