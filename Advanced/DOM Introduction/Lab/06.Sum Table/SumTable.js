function sumTable() {
    const rows = document.querySelectorAll('table tr');

    let sum = 0

    for (let i = 1; i < rows.length - 1; i++) {
        const cell = rows[i].lastElementChild;
        sum += Number(cell.textContent);
    }

    document.getElementById('sum').textContent = sum;



}