function solve(numbers) {

    function sumAll(numbers) {
        let result = 0;

        for (let num of numbers) {
            result += num;
        }
        return result
    }

    function name(params) {
        
    }
    
    aggregate(numbers, 0, (a, b)=>a + 1 / b);
}


function aggregateElements(input) {
    let elements = input.map(Number);
    aggregate(elements, 0, (a, b)=>a + b);
    aggregate(elements, 0, (a, b)=>a + 1 / b);
    aggregate(elements, "", (a, b)=>a + b);
 
    function aggregate(arr, initVal, func) {
        let val = initVal;
        for (let i = 0; i < arr.length; i++) {
            val = func(val, arr[i]);
        }
        console.log(val);
    }
}
 
aggregateElements([10, 20, 30]);