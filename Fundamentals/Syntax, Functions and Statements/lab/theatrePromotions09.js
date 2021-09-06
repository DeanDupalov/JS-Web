function theatrePromotion(day, age) {
    let result = `Error!`
    if (age < 0 || age > 122) {
       return console.log(result)
        
    }
    
    let price = 0
    if (day == 'Weekday'){
        if (0 <= age && age <= 18){
            price = 12
        } else if (18 < age && age <= 64){
            price = 18
        } else if (64 < age && age <= 122){
            price = 12
        }
    }else if (day == 'Weekend'){
        if (0 <= age && age <= 18){
            price = 15
        } else if (18 < age && age <= 64){
            price = 20
        } else if (64 < age && age <= 122){
            price = 15
        }
    }else if (day == 'Holiday'){
        if (0 <= age && age <= 18){
            price = 5
        } else if (18 < age && age <= 64){
            price = 12
        } else if (64 < age && age <= 122){
            price = 10
        }
    }
    result = `${price}$`
    console.log(result)
    
}

theatrePromotion('Weekday', 42)