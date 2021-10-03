function encodeAndDecodeMessages() {
    function encodeText(text) {
        let result = ''
        for (let ch of text){
            result += String.fromCharCode(ch.charCodeAt(0) + 1);
        }
        return result;
    }

    function decodeText(text) {
        let result = ''
        for (let ch of text){
            result += String.fromCharCode(ch.charCodeAt(0) - 1);
        }
        return result;
    }

    const main = document.getElementById('main');

    const encodeBtn = main.querySelectorAll('div button')[0];
    encodeBtn.addEventListener('click', encodeSendHandler);


    const decodeBtn = main.querySelectorAll('div button')[1];
    decodeBtn.addEventListener('click', decodeReadHandler);


    function encodeSendHandler(e) {
        let textToEncode = e.target.previousElementSibling;
        decodeBtn.previousElementSibling.value = encodeText(textToEncode.value);
        textToEncode.value = '';

    }

    function decodeReadHandler(e) {
        let textToDecode = e.target.previousElementSibling;
        decodeBtn.previousElementSibling.value = decodeText(textToDecode.value);
    }
}



