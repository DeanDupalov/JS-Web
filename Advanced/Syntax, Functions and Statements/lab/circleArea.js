function calculateCircleArea(radius) {
    if (typeof(radius) !==  "number") {
        return `We can not calculate the circle area, because we receive a ${typeof(radius)}.`;

    } else {
        area = Math.PI * (radius ** 2)
        return area.toFixed(2)
    }
}



console.log(calculateCircleArea(5));