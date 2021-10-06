function solve(employeesStr, criteria) {
    const arrEmployees = JSON.parse(employeesStr);
    const [key, value] = criteria.split('-');

    function findByCriteria(obj, k, v) {
        if (k === 'all') {
            return true
        }
        return obj[k] === v;
    }
    const result = [];

    for (let emp of arrEmployees){
        if(findByCriteria(emp, key, value)){
            result.push(emp)
        }
    }
    let output = '';

    for (let i = 0; i < result.length; i++) {
        output += `${i}. ${result[i].first_name} ${result[i].last_name} - ${result[i].email}\n`
    }
    console.log(output);
}

const employees = `[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`
const employees2 = `[{
    "id": "1",
    "first_name": "Kaylee",
    "last_name": "Johnson",
    "email": "k0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Johnson",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  }, {
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }, {
    "id": "4",
    "first_name": "Evanne",
    "last_name": "Johnson",
    "email": "ev2@hostgator.com",
    "gender": "Male"
  }]`


// solve(employees, 'gender-Female');
// solve(employees2, 'last_name-Johnson');
solve(employees2, 'all');