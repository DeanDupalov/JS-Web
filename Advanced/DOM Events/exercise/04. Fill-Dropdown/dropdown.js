function addItem() {
    let newItemText = document.getElementById('newItemText');
    let newItemValue = document.getElementById('newItemValue');

    let newElement = document.createElement('option');
    newElement.textContent = newItemText.value;
    newElement.value = newItemValue.value;


    let selectElement = document.getElementById('menu');

    selectElement.appendChild(newElement);
    console.log(selectElement);
    newItemText.value = '';
    newItemValue.value = '';

}