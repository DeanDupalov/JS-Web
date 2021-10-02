function lockedProfile() {

    const main = document.getElementById('main').addEventListener('click', onClick);

    function onClick(e) {
        if (e.target.tagName === 'BUTTON') {
            if (!e.target.parentElement.querySelectorAll('input[type = "radio"]')[0].checked) {
                let info = e.target.parentElement.querySelector('div');

                if (e.target.textContent == 'Show more') {
                    info.style.display = 'block';
                    e.target.textContent = 'Hide it';
                } else {
                    e.target.textContent = 'Show more';
                    info.style.display = '';
                }
            }

        }
    }

}