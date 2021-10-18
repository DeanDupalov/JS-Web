function solve() {

    const addBtn = document.querySelector('.admin-view .action button');

    const trainingsDiv = document.querySelector('.modules');

    const [nameInput, dateInput] = Array.from(document.querySelectorAll('.form-control input'));
    const moduleInput = document.querySelector('.form-control select');
    addBtn.addEventListener('click', addLecture);


    function addLecture(e) {
        e.preventDefault();
        let name = nameInput.value
        let [data, time] = dateInput.value.split('T')
        let module = moduleInput.value


        if (name === '' || data === '' || module === 'Select module' || module === '') {
            return;
        }

        const modules = Array.from(trainingsDiv.children);

        const delBtn = create('button', {}, 'Del')
        delBtn.classList.add('red');

        const lectureLi = create('li', {},
            create('h4', {}, `${name} - ${data} - ${time}`),
            delBtn
        )
        lectureLi.classList.add('flex')
        const currentModuleArr = modules.filter(m => m.firstChild.textContent === `${module.toUpperCase()}-MODULE`);

        if (currentModuleArr.length > 0 ) {
            const currentModule = currentModuleArr[0];

            currentModule.children[1].appendChild(lectureLi);
            console.log(currentModule.children[1])


        } else {
            const moduleDiv = create('div', {},
                create('h3', {}, `${module.toUpperCase()}-MODULE`),
                create('ul', {}, lectureLi)
            )
            moduleDiv.classList.add('module');
            moduleDiv.getElementsByTagName('ul')[0].appendChild(lectureLi);
            trainingsDiv.appendChild(moduleDiv);
        }


        nameInput.value = '';
        dateInput.value = '';
        moduleInput.value = '';

    }

    function create(type, attr, ...content) {
        const element = document.createElement(type);

        for (let prop in attr) {
            element[prop] = attr[prop];
        }

        for (let item of content) {
            if (typeof item == 'string' || typeof item == 'number') {
                item = document.createTextNode(item);
            }
            element.appendChild(item)
        }
        return element;
    }

}