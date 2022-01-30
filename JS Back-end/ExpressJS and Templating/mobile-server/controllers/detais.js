module.exports= {
    async details(req, res){
        const id = req.params.id;
        const car = await req.storage.getCarById(id);
        if(car){
            console.log(car.accessories)
            res.render('details', {car, title: `${car.name}`});
        }else {
            res.redirect('/404');
        }
    }
}