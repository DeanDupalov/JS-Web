function create(words) {
   const content = document.getElementById('content');

   function onclick(e) {
      if (e.target.tagName == 'DIV' && e.target != content){
         e.target.firstChild.style.display = '';
      }
        
   }
   content.addEventListener('click', onclick);

   words.forEach(word => {
      const element = document.createElement('div');

      const paragraph = document.createElement('p');
      paragraph.style.display = 'none';
      paragraph.textContent = word;

      element.appendChild(paragraph);

      content.appendChild(element);

   });
}