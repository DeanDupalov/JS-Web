function solve() {
    const [nameInput, hallInput,priceInput] = Array.from(document.querySelectorAll('#container input'));
    document.querySelector('#container button').addEventListener('click', onClick);


    function onClick(e) {
        console.log(isNaN(Number(priceInput.value)));
        // if([nameInput, hallInput,priceInput].every((el) => el.value !== '') && isNaN(Number(priceInput.value))){
        //     console.log('True')
        // }
    }



}