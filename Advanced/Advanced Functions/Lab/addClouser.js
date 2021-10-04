function solve(number) {

    function addNumber(secondNum){
        return number + secondNum
    }
    return addNumber;
}


let addNum = solve(5);
console.log(addNum(100));