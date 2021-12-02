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
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';

    }else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}