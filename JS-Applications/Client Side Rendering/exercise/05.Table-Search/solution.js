import {render} from './../node_modules/lit-html/lit-html.js'
import {get} from "../api.js";
import {rows} from "./templatesTable.js";

const url = 'http://localhost:3030/jsonstore/advanced/table'
document.querySelector('#searchBtn').addEventListener('click', onClick);
const tableBody = document.getElementById('tableBody');

let students = [];
loadStudents()

async function loadStudents() {
    const allPeopleObj = await get(url);

    students = Object.values(allPeopleObj).map(s => ({
        name: `${s.firstName} ${s.lastName}`,
        course: s.course,
        email: s.email,
    }))
    render(rows(students), tableBody)
}


function onClick() {
    const searchInput = document.getElementById('searchField');
    const searchText = searchInput.value.toLowerCase();

    let allStudents = students.map(s => Object.assign({}, s));
    let matchedStudents = allStudents
        .filter(s => Object.values(s)
            .some(value => value.toLowerCase()
                .includes(searchText)));
    matchedStudents.forEach(s => s.class = 'select');
    searchInput.value = '';

    render(rows(allStudents), tableBody)
}
