function toStringExtension() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
        toString(){
            let className = this.constructor.name
            return `${className} (name: ${this.name}, email: ${this.email})`
        }

    }
    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }
        toString() {
            return super.toString().slice(0, -1) + `, subject: ${this.subject})`;
        }

    }
    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);
            this.course = course;
        }

        toString() {
            return super.toString() + `, course: ${this.course}`;
        }

    }

    return {
        Person,
        Teacher,
        Student
    }
}

let classes = toStringExtension();
let Person = classes.Person;
let Teacher = classes.Teacher;
let Student = classes.Student;

let t = new Teacher("Ivan",'ivan@ivan.com',"Graphics");
// let p = new Person("Ivan",'ivan@ivan.com',"Graphics");
// let s = new Student("Ivan",'ivan@ivan.com',"Graphics");
// expect(t.toString()).to.equal('Teacher (name: Ivan, email: ivan@ivan.com, subject: Graphics)');
// console.log(p.toString())
console.log(t.toString())
// console.log(s.toString())