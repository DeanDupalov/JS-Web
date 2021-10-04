function multiply_by(factor){
    function wrapper(n){
        return n * factor
    }
    return wrapper
}

multiply_by_2 = multiply_by(2)
console.log(multiply_by_2(5))

multiply_by_3 = multiply_by(3)
console.log(multiply_by_3(5))