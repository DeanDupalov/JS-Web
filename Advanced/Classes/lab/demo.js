class Circle {
    constructor(r) {
        this.r = r;
    }
    calcArea() {
        return this.r * Math.PI
    }
}

const circle1 = new Circle(3);
console.log((circle1.calcArea()));