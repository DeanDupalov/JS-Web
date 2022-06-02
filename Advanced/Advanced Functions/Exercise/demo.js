function positiveSum(arr) {
    let result = 0;

    arr.forEach(x => {
        if(x >= 0){
            result += x;
        }   
    });

    return result;
  }
  
  console.log(positiveSum([]));