function findPreviousDay(year, month, day) {

    let dateStr = year + '-' + month + '-' + day;
    let date = new Date(dateStr);
  
    date.setDate(day - 1);
    return `${Number(date.getFullYear())}-${Number(date.getMonth()) + 1}-${Number(date.getDate())}`;
}


console.log(findPreviousDay(2016, 10, 1));



