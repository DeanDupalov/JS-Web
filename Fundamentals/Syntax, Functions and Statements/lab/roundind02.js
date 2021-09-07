function rounding(number, decimal) {
    if (decimal > 15){
        decimal = 15
    }
    let numberToFixeString = number.toFixed(decimal)

    let result = parseFloat(numberToFixeString)
    console.log(result)
}

rounding(3.1787878, 3)