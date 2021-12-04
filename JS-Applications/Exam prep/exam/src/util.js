export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}

export function updateUserNav() {
    const userData = getUserData();

    if(userData){
        document.querySelector('.user-nav-create').style.display = 'inline-block';
        document.querySelector('.user-nav-logout').style.display = 'inline-block';

        document.querySelector('.guest-nav-login').style.display = 'none';
        document.querySelector('.guest-nav-register').style.display = 'none';

    }else {
        document.querySelector('.user-nav-create').style.display = 'none';
        document.querySelector('.user-nav-logout').style.display = 'none';

        document.querySelector('.guest-nav-login').style.display = 'inline-block';
        document.querySelector('.guest-nav-register').style.display = 'inline-block';
    }
}

export function updateDetailsBtn() {
    if(sessionStorage.length > 0){
        document.getElementById('detailsBtn').style.display = 'block';

    }else {
        document.getElementById('detailsBtn').style.display = 'none';
    }
}