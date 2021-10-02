function addItem() {
    let input = document.getElementById('newItemText');

    let newElement = document.createElement('li');
    newElement.textContent = input.value;

    let button = document.createElement('a');
    button.textContent = '[Delete]';
    button.href = '#';
    button.addEventListener('click', removeElement)
    newElement.appendChild(button);
    document.getElementById('items').appendChild(newElement);
    
    input.value = '';

    function removeElement(e){
        e.target.parentNode.remove()
    }
}