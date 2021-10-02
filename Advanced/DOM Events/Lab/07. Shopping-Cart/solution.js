function solve() {
   document.getElementsByClassName('shopping-cart')[0].addEventListener('click', onClick);
   document.getElementsByClassName('checkout')[0].addEventListener('click', checkout);
   const cart = [];
   const output = document.getElementsByTagName('textarea')[0];
   function onClick(e){
      
      if (e.target.tagName == 'BUTTON' && e.target.classList.contains('add-product')){
         const product = e.target.parentNode.parentNode;
         
         const name = product.querySelector('.product-title').textContent;
         const price = Number(product.querySelector('.product-line-price').textContent);
         
         cart.push({
            name,
            price
         });

         output.value += `Added ${name} for ${price} to the cart.\n`
      }
   }

   function checkout(e){
      const products = new Set();
      cart.forEach(p => products.add(p.name));
      const total = cart.reduce((t, cp) => t + cp.price, 0);

      output.value += `You bought ${[...products.keys()].join(', ')} for ${total}.`
   }

}