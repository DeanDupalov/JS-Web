function deleteByEmail() {
    let input = document.querySelector('input[name=email]');

    const rows = Array
    .from(document.querySelector('tbody').children)
    .filter(row => row.children[1].textContent == input.value);

    rows.forEach(row => row.remove());

    document.getElementById('result').textContent =rows.length > 0 ? 'Deleted.' : 'Not found.';

}