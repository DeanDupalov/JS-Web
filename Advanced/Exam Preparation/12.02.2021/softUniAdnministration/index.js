function solve() {

    const addBtn = document.querySelector('.admin-view .action button');
    addBtn.addEventListener('click', addLecture)
    let modules = {}

    function addLecture(e) {
        e.preventDefault();

        let lectureName = document.querySelector('input[name="lecture-name"]');
        let lectureDate = document.querySelector('input[name="lecture-date"]');
        let lectureModule = document.querySelector('select[name="lecture-module"]');


        if (!lectureName.value || !lectureDate.value || lectureModule.value === 'Select module') {
            return;
        }

        if (!modules[lectureModule.value]) {
            modules[lectureModule.value] = [];
        }
        let currentLecture = {
            name: lectureName.value,
            date: lectureDate,
        }
        modules[lectureModule.value].push(currentLecture);

        lectureName.value = '';
        lectureDate.value = '';
        lectureModule.value = 'Select module';


        creatTrainings(modules);

        function creatTrainings(modules) {
            let modulesElement = document.querySelector('.modules');
            modulesElement.innerHTML = '';
            for (const moduleName in modules) {
                let moduleElement = createModule(moduleName);
                let lectureListElement = document.createElement('ul');
                let lectures = modules[moduleName];
                lectures
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .forEach(({name, date}) => {
                        let lectureElement = createLecture(name, date, moduleName);
                        lectureListElement.appendChild(lectureElement);
                        lectureElement.querySelector('button').addEventListener('click', (e) => {
                            e.currentTarget.parentNode.remove();

                            modules[moduleName] = modules[moduleName]
                                .filter(x => !(x.name === name && x.date === date))

                            if(modules[moduleName].length === 0){
                                e.currentTarget.closest('.module').remove();
                            }else {
                                e.currentTarget.parentNode.remove();
                            }

                        })

                    })
                moduleElement.appendChild(lectureListElement);
                modulesElement.appendChild(moduleElement);
            }


            function formatDate() {

            }

            function createModule(name) {
                let divElement = document.createElement('div');
                divElement.classList.add('module');
                let headingElement = document.createElement('h3');
                headingElement.textContent = `${name.toUpperCase()} - MODULE`;

                divElement.appendChild((headingElement));

                return divElement
            }

            function createLecture(name, date, moduleName) {
                let liElement = document.createElement('li');
                liElement.classList.add('flex');

                let courseHeadingElement = document.createElement('h4');
                courseHeadingElement.textContent = `${name} - ${date}`

                let delBtn = document.createElement('button');
                delBtn.classList.add('red');
                delBtn.textContent = 'Del';

                liElement.appendChild(courseHeadingElement);
                liElement.appendChild(delBtn);

                return liElement;
            }
        }
    }
}


// function solve() {
//
//     const addBtn = document.querySelector('.admin-view .action button');
//
//     const trainingsDiv = document.querySelector('.modules');
//
//     const [nameInput, dateInput] = Array.from(document.querySelectorAll('.form-control input'));
//     const moduleInput = document.querySelector('.form-control select');
//     addBtn.addEventListener('click', addLecture);
//
//
//     function addLecture(e) {
//         e.preventDefault();
//         let name = nameInput.value
//         let [data, time] = dateInput.value.split('T')
//         let module = moduleInput.value
//
//
//         if (name === '' || data === '' || module === 'Select module' || module === '') {
//             return;
//         }
//
//         const modules = Array.from(trainingsDiv.children);
//
//         const delBtn = create('button', {}, 'Del')
//         delBtn.classList.add('red');
//
//         const lectureLi = create('li', {},
//             create('h4', {}, `${name} - ${data} - ${time}`),
//             delBtn
//         )
//         lectureLi.classList.add('flex')
//         const currentModuleArr = modules.filter(m => m.firstChild.textContent === `${module.toUpperCase()}-MODULE`);
//
//         if (currentModuleArr.length > 0 ) {
//             const currentModule = currentModuleArr[0];
//
//             currentModule.children[1].appendChild(lectureLi);
//             console.log(currentModule.children[1])
//
//
//         } else {
//             const moduleDiv = create('div', {},
//                 create('h3', {}, `${module.toUpperCase()}-MODULE`),
//                 create('ul', {}, lectureLi)
//             )
//             moduleDiv.classList.add('module');
//             moduleDiv.getElementsByTagName('ul')[0].appendChild(lectureLi);
//             trainingsDiv.appendChild(moduleDiv);
//         }
//
//
//         nameInput.value = '';
//         dateInput.value = '';
//         moduleInput.value = '';
//
//     }
//
//     function create(type, attr, ...content) {
//         const element = document.createElement(type);
//
//         for (let prop in attr) {
//             element[prop] = attr[prop];
//         }
//
//         for (let item of content) {
//             if (typeof item == 'string' || typeof item == 'number') {
//                 item = document.createTextNode(item);
//             }
//             element.appendChild(item)
//         }
//         return element;
//     }
//
// }
//
//
//
//
