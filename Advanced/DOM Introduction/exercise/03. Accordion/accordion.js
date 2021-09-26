function toggle() {
    const text = document.getElementById('extra');
    

    let button = document.getElementsByClassName('button')[0].textContent;
    if(button == 'Less'){
        text.style.display = 'none';
        document.getElementsByClassName('button')[0].textContent = 'More';

    }else if (button == 'More'){
        text.style.display = 'block';
        document.getElementsByClassName('button')[0].textContent = 'Less';
    }
    
    
    
    
    
}