function findSameNumbers(number) {
    let myFunc = num => Number(num);
    let intArr = Array.from(String(number), myFunc);

    let isSame = true;
    let result = intArr[0];

    for (let i = 1; i < intArr.length; i++) {
        result += intArr[i];

        if (intArr[i] != intArr[i-1]){
            isSame = false;
        }
    }

    console.log(isSame);
    console.log(result);
    
}



findSameNumbers(2222222);