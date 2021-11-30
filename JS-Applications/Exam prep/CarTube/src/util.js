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
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';

        document.getElementById('gratings').textContent = `Welcome, ${userData.username}`
    }else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}
