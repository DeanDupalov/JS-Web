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