function extendPrototype(classToExtend) {
    classToExtend.prototype.species = 'Human';
    classToExtend.prototype.toSpeciesString = function (){
        return  `I am a ${classToExtend.prototype.species}. ${this.toString()}`
    }
}

class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    toString() {
        let className = this.constructor.name
        return `${className} (name: ${this.name}, email: ${this.email})`
    }

}



extendPrototype(Person);

let p = new Person("Ivan",'ivan@ivan.com',"Graphics");

console.log(p.species)
console.log(p.toSpeciesString())

