function calculator() {
    let firstElement;
    let secondElement;
    let resultBox;

    function init(selector1, selector2, resultSelector) {
        firstElement = document.querySelector(selector1);
        secondElement = document.querySelector(selector2);
        resultBox = document.querySelector(resultSelector);
        console.log(firstElement, secondElement,resultBox);
    }
    
    function add() {
        resultBox.value = Number(firstElement.value) + Number(secondElement.value);

    }
    function subtract () {
        resultBox.value = Number(firstElement.value) - Number(secondElement.value);
    }

    return {
        init,
        add,
        subtract,
    }
}
const calculate = calculator ();
calculate.init ('#num1', '#num2', '#result'); 




