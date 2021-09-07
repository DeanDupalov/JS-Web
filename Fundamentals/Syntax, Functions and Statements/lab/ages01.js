function solve(age) {
    let result = '';
    if ( age >= 0 && age <=2){
        result = 'baby';
        console.log(result);
    }else if (age >= 3 && age <=13){
        result = 'child';
        console.log(result);
    }else if (age >= 14 && age <=19){
        result = 'teenager';
        console.log(result);
    }else if (age >= 20 && age <=65){
        result = 'adult';
        console.log(result);
    }else if (age > 65){
        result = 'elder';
        console.log(result);
    } else {
        console.log('out of bounds')
    }
    
}

solve(-5)