function search() {
   const towns = Array.from(document.querySelectorAll('ul li'));

   let searchInput = document.getElementById('searchText').value;
   console.log(towns);

   let count = 0;

   for (let el of towns) {
      if (el.textContent.includes(searchInput)) {

         el.style.fontWeight = "bold";
         el.style.textDecoration = 'underline';
         count += 1;
      } else {
         el.style.fontWeigth = 'normal';
         el.style.textDecoration = '';
      }
   }
   document.getElementById('result').textContent = `${count} matches found`;

}
