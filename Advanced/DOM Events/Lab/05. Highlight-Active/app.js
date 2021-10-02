function focused() {
    const fields = Array.from(document.getElementsByTagName('input'));

    for (let field of fields){
        field.addEventListener('focus', onFocus);
        field.addEventListener('blur', onBlur);
    }
    function onFocus(e){
        e.target.parentNode.className = 'focused';
    }

    function onBlur(e){
        e.target.parentNode.className = '';
    }
}