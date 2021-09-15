function stringLength(strOne, strTwo, StrThree) {
    let strings = [strOne, strTwo, StrThree];
    let totalLength = 0;

    for (let el of strings) {
        totalLength += el.length;
    }

    let avg = totalLength / strings.length;

    console.log(totalLength)
    console.log(Math.round(avg));
}



stringLength('pasta', '5', '22.3')