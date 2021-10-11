class Rectangle {
    constructor(width, height, color ) {
        this.height = height;
        this.width = width;
        this.color = color;
    }
    calcArea() {
        return this.width * this.height;
    }
}

let rect = new Rectangle(4, 5, 'Red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());
