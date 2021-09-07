function solve(num) {
    let total = 0;
    let i = 0;
    while (num > 0){
        if (i % 2 != 0){
            total += i;
            console.log(i);
            
            num--;
        }
        i++;
    }
    console.log(`Sum: ${total}`)
}

solve(3)