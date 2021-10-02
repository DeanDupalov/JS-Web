function attachGradientEvents() {
    const gradiant = document.getElementById('gradient');
    gradiant.addEventListener('mousemove', onMove);

    function onMove(e) {
        const box = e.target;
        const offset = Math.floor(e.offsetX / box.clientWidth * 100);
        
        const result = document.getElementById('result');
        result.textContent = `${offset}%`;
    }

}