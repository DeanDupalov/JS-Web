function add(number) {
    let result = number;

    function wrapper(num){
        result += num;
        return wrapper;
    }

    wrapper.toString = () => {
        return result;
    }

    return wrapper;
}

console.log(add(1)(3).toString())


function positiveSum(arr) {
    // write your code here
  }
  
  console.log(positiveSum([1,-2,3,4,5]));