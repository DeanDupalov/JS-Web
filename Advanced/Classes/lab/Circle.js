class Circle {
    constructor(r) {
        this.r = r;
    }

    get diameter() {
        return this.r * 2;
    }

    set diameter(val) {
        this.r = val / 2;
    }

    get radius(){
        return this.r;
    }

    get area() {
        return Math.PI * (this.r ** 2);
    }
}

let c = new Circle(2);
console.log(`Radius: ${c.radius}`);
console.log(`Diameter: ${c.diameter}`);
console.log(`Area: ${c.area}`);
c.diameter = 1.6;
console.log(`Radius: ${c.radius}`);
console.log(`Diameter: ${c.diameter}`);
console.log(`Area: ${c.area}`);
