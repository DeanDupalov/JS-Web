function solve() {
    const [addTaskSection, openSection, inProgressSection, completeSection] = document.querySelectorAll('section');
    const addButton = document.getElementById('add');
    addButton.addEventListener('click', addTaskHandler)

    let taskInput = document.getElementById('task');
    let descriptionInput = document.getElementById('description');
    let dateInput = document.getElementById('date')


    function addTaskHandler(e) {
        e.preventDefault();

        const task = taskInput.value;
        const description = descriptionInput.value;
        const date = dateInput.value;

        if (task === '' || description === '' || date === '') {
            return
        }

        let taskArticle = document.createElement('article');
        let taskHeading = document.createElement('h3');
        taskHeading.textContent = task;
        let descriptionPara = document.createElement('p');
        descriptionPara.textContent = `Description: ${description}`
        let datePara = document.createElement('p');
        datePara.textContent = `Due Date: ${date}`

        let buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('flex');

        let startButton = document.createElement('button');
        startButton.classList.add('green');
        startButton.textContent = 'Start'
        startButton.addEventListener('click', startHandler)

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteHandler)

        buttonsDiv.appendChild(startButton);
        buttonsDiv.appendChild(deleteButton);

        taskArticle.appendChild(taskHeading);
        taskArticle.appendChild(descriptionPara);
        taskArticle.appendChild(datePara);
        taskArticle.appendChild(buttonsDiv);

        let openSectionDivContainer = openSection.lastElementChild;

        openSectionDivContainer.appendChild(taskArticle);

        // const task = taskInput.value;
        // const description = descriptionInput.value;
        // const date = dateInput.value;

    }

    function startHandler(e) {
        let currentTaskArticle = e.currentTarget.parentElement.parentElement;

        currentTaskArticle.lastElementChild.removeChild(currentTaskArticle.querySelector('.green'));

        let finishButton = document.createElement('button');
        finishButton.classList.add('orange');
        finishButton.textContent = 'Finish'
        finishButton.addEventListener('click', finishHandler);
        currentTaskArticle.lastElementChild.appendChild(finishButton);
        inProgressSection.lastElementChild.appendChild(currentTaskArticle);

    }

    function deleteHandler(e) {
        let currentTaskArticle = e.currentTarget.parentElement.parentElement;
        currentTaskArticle.remove();
    }

    function finishHandler(e) {
        let currentTaskArticle = e.currentTarget.parentElement.parentElement;

        currentTaskArticle.removeChild(currentTaskArticle.lastElementChild);
        completeSection.lastElementChild.appendChild(currentTaskArticle);
    }

}