function addItem() {
    let itemsList = document.getElementById('items');
    let input = document.getElementById('newItemText');
    
    let newElement = document.createElement('li');
    newElement.textContent = input.value;
    itemsList.appendChild(newElement);
    input.value = '';
}