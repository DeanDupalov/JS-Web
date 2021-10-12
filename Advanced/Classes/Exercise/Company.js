class Company {

    constructor() {
        this.departments = {};

    }

    addEmployee(name, salary, position, department) {
        this.validateNotEmptyStr(name, salary, position, department);
        Company.validateSalary(salary);
        if (!Object.keys(this.departments).includes(department)) {
            this.departments[department] = [];
        }
        this.departments[department].push(Company.employeeFactory(name, salary, position));
        return `New employee is hired. Name: ${name}. Position: ${position}`

    }

    bestDepartment() {

        let [bestDepartmentName, avgTopSalary] = this.findDepartment();
        let result = `Best Department is: ${bestDepartmentName}\n` +
            `Average salary: ${avgTopSalary.toFixed(2)}\n`
        this.departments[bestDepartmentName].sort((a,b) => {
            return b.salary - a.salary || a.name.localeCompare(b.name);
        })
        const theDepartment = this.departments[bestDepartmentName]
        for(const emp of theDepartment){
            result += `${emp.name} ${emp.salary} ${emp.position}\n`
        }
        return result.trim();

    }

    findDepartment() {
        let departmentName = '';
        let avgTopSalary = 0;

        for (const department in this.departments){

            let total = 0
            for(const emp of this.departments[department]){
                total += emp.salary
            }
            let avgSalary = total / this.departments[department].length

            if(avgSalary > avgTopSalary){
                avgTopSalary = avgSalary;
                departmentName = department;
            }
        }
        return [departmentName, avgTopSalary];
    }

    static employeeFactory(name, salary, position) {
        return {
            name,
            salary,
            position,
        };
    }

    validateNotEmptyStr(...params) {
        params.forEach((el) => {
            if(el === ''){
                throw Error("Invalid input!");
            }
        })
    }
    static validateSalary(salary){
        if(salary < 0){
            throw Error("Invalid input!");
        }
    }
}



// let c = new Company();
// c.addEmployee("Stanimir", 2000, "engineer", "Construction");
// c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
// c.addEmployee("Slavi", 500, "dyer", "Construction");
// c.addEmployee("Stan", 2000, "architect", "Construction");
// c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
// c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
// c.addEmployee("Gosho", 1350, "HR", "Human resources");
// console.log(c.bestDepartment());

let c = new Company();

let actual1 = c.addEmployee("Stanimir", 2000, "engineer", "Human resources");
let expected1 = "New employee is hired. Name: Stanimir. Position: engineer";
console.log(actual1, expected1)

c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");

let act = c.bestDepartment();
let exp = "Best Department is: Human resources\nAverage salary: 1675.00\nStanimir 2000 engineer\nGosho 1350 HR";
console.log(act,exp);