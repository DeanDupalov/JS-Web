function solveClasses() {
    class Developer {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }

        addTask(id, taskName, priority) {
            let task = {
                id,
                taskName,
                priority,
            }

            if (priority === 'high') {
                this.tasks.unshift(task)
            } else {
                this.tasks.push(task)
            }

            return `Task id ${id}, with ${priority} priority, has been added.`

        }

        doTask() {
            if (this.tasks.length > 0) {
                const task = this.tasks.shift()
                return task.taskName;
            } else {
                return `${this.firstName}, you have finished all your tasks. You can rest now.`
            }

        }

        getSalary() {
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`
        }

        reviewTasks() {
            let result = ['Tasks, that need to be completed:',]
            this.tasks.forEach((t) => {
                result.push(`${t.id}: ${t.taskName} - ${t.priority}`)
            })

            return result.join('\n');
        }
    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);

            this.baseSalary = 1000 + bonus;
            this.experience = experience;
        }

        learn(years) {
            this.experience += years;
        }
    }

    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);

            this.baseSalary = 1000 + bonus;
            this.experience = experience + 5;
        }
        changeTaskPriority(taskId){
            let taskIdx;


            for (let i = 0; i < this.tasks.length ; i++) {
                if(this.tasks[i].id === taskId){
                    taskIdx = i;
                }
            }
            let currentTask = this.tasks[taskIdx];

            if(currentTask.priority === 'high'){
                currentTask.priority = 'low';
                this.tasks.splice(taskIdx, 1);
                this.tasks.push(currentTask);
            }else {
                currentTask.priority = 'high';
                this.tasks.splice(taskIdx, 1);
                this.tasks.unshift(currentTask);
            }

            return currentTask

        }
    }

    return {
        Developer,
        Junior,
        Senior
    }
}

let classes = solveClasses();
const developer = new classes.Developer("George", "Joestar");
console.log(developer.addTask(1, "Inspect bug", "low"));
console.log(developer.addTask(2, "Update repository", "high"));
console.log(developer.doTask());
console.log(developer.doTask());
console.log(developer.doTask());



//
// const junior = new classes.Junior("Jonathan", "Joestar", 200, 2);
// console.log(junior.getSalary());
//
// const senior = new classes.Senior("Joseph", "Joestar", 200, 2);
// senior.addTask(1, "Create functionality", "low");
// senior.addTask(2, "Update functionality", "high");
// console.log(senior.changeTaskPriority(1)["priority"]);
