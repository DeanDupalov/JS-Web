function storeCatalogue(data) {
    const catalogue = {};

    data.forEach(element => {
        let [productName, price] = element.split(' : ');
        price = Number(price);
        const index = productName[0];

        if(!catalogue[index]){
            catalogue[index] = {
                
            }
        }
    });
}