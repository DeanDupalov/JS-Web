function solve() {
    const createBtn = document.querySelector('.site-content aside button.btn.create')
    const postSection = document.querySelector('.site-content main section');

    createBtn.addEventListener('click', createArticle);


    function createArticle(e) {
        e.preventDefault();

        let creator = document.getElementById('creator');
        let title = document.getElementById('title');
        let category = document.getElementById('category');
        let content = document.getElementById('content');

        // if (creator.value === '' || title.value === '' || category.value === '' || content.value === '') {
        //     return;
        // }

        let articleElement = document.createElement('article');

        let h1 = document.createElement('h1');
        h1.textContent = `${title.value}`;

        let paraCategory = document.createElement('p');
        paraCategory.textContent = 'Category: '
        let strongCategory = document.createElement('strong');
        strongCategory.textContent = category.value;
        paraCategory.appendChild(strongCategory);

        let paraCreator = document.createElement('p');
        paraCreator.innerHTML = `Creator: `
        let strongCreator = document.createElement('strong');
        strongCreator.textContent = creator.value;
        paraCreator.appendChild(strongCreator);

        let paraContent = document.createElement('p');
        paraContent.textContent = content.value;

        let divButtonsContainer = document.createElement('div');
        divButtonsContainer.classList.add('buttons');

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', deleteArticle);

        let archiveButton = document.createElement('button');
        archiveButton.classList.add('btn');
        archiveButton.classList.add('archive');
        archiveButton.textContent = 'Archive';

        archiveButton.addEventListener('click', archiveArticle);

        divButtonsContainer.appendChild(deleteButton);
        divButtonsContainer.appendChild(archiveButton);

        articleElement.appendChild(h1);
        articleElement.appendChild(paraCategory);
        articleElement.appendChild(paraCreator);
        articleElement.appendChild(paraContent);
        articleElement.appendChild(divButtonsContainer);

        postSection.appendChild(articleElement);

    }

    function archiveArticle(e) {
        const currentArticle = e.target.parentElement.parentElement;
        const archiveOl = document.querySelector('.archive-section ol')


        const archiveList = Array.from(archiveOl.querySelectorAll('li'))
        const titleHeading = currentArticle.querySelector('h1');
        let articleTitle = titleHeading.textContent;

        let liElement = document.createElement('li');
        liElement.textContent = articleTitle;
        currentArticle.remove();

        archiveList.push(liElement);
        archiveList
            .sort((a, b) => {
                a.textContent.localeCompare(b.textContent)
            })
            .forEach(li => {
                archiveOl.appendChild(li);
            })

    }

    function deleteArticle(e) {
        e.target.parentElement.parentElement.remove()
    }


}
