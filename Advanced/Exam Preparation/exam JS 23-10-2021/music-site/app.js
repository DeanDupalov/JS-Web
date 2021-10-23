window.addEventListener('load', solve);

function solve() {
    const addButton = document.getElementById('add-btn');
    addButton.addEventListener('click', addSongHandler)

    let allHitsContainer = document.querySelector('#all-hits .all-hits-container');
    let totalLikesSection = document.getElementById('total-likes');
    let countTotalLikes = 0;

    let savedHitsContainer = document.querySelector('#saved-hits .saved-container');

    let genreInput = document.getElementById('genre')
    let nameInput = document.getElementById('name')
    let authorInput = document.getElementById('author')
    let dateInput = document.getElementById('date')

    function addSongHandler(e) {
        e.preventDefault();

        let genre = genreInput.value;
        let name = nameInput.value;
        let author = authorInput.value;
        let date = dateInput.value;

        if (genre === '' || name === '' || author === '' || date === '') {
            return
        }

        let divHitInfo = document.createElement('div');
        divHitInfo.classList.add('hits-info');

        let imageElement = document.createElement('img');
        imageElement.src = "./static/img/img.png";

        let genreHeading = document.createElement('h2');
        genreHeading.textContent = `Genre: ${genre}`;

        let nameHeading = document.createElement('h2');
        nameHeading.textContent = `Name: ${name}`;

        let authorHeading = document.createElement('h2');
        authorHeading.textContent = `Author: ${author}`;

        let dateHeading = document.createElement('h3');
        dateHeading.textContent = `Date: ${date}`;

        let saveButton = document.createElement('button');
        saveButton.classList.add('save-btn');
        saveButton.textContent = 'Save song';
        saveButton.addEventListener('click', saveSongHandler)

        let likeButton = document.createElement('button');
        likeButton.classList.add('like-btn');
        likeButton.textContent = 'Like song';
        likeButton.addEventListener('click', likeSongHandler);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', deleteSongHandler)

        divHitInfo.appendChild(imageElement);
        divHitInfo.appendChild(genreHeading);
        divHitInfo.appendChild(nameHeading);
        divHitInfo.appendChild(authorHeading);
        divHitInfo.appendChild(dateHeading);
        divHitInfo.appendChild(saveButton);
        divHitInfo.appendChild(likeButton);
        divHitInfo.appendChild(deleteButton);

        allHitsContainer.appendChild(divHitInfo);


        genreInput.value = '';
        nameInput.value = '';
        authorInput.value = '';
        dateInput.value = '';

    }

    function saveSongHandler(e) {
        let currentSong = e.currentTarget.parentElement;
        currentSong.removeChild(currentSong.querySelector('.save-btn'));
        currentSong.removeChild(currentSong.querySelector('.like-btn'));

        savedHitsContainer.appendChild(currentSong);
    }
    function likeSongHandler(e) {
        let likesPara = document.querySelector('#total-likes .likes p');
        countTotalLikes += 1;
        likesPara.textContent = `Total Likes: ${countTotalLikes}`

        e.currentTarget.disabled = true;
    }
    function deleteSongHandler(e) {
        let currentSong = e.currentTarget.parentElement;
        currentSong.remove();
    }
}