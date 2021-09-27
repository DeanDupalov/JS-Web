function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {

      let input = document.getElementById('searchField').value;
      let table = Array.from(document.querySelectorAll('tbody tr'));

      for (let row of table) {

         if(row.textContent.includes(input)){
            row.classList.toggle('select');
         }
      }

   }
 

}