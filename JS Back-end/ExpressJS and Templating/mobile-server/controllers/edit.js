module.exports = {
    async get(req, res){
        const id = req.params.id;
        const car = await req.storage.getCarById(id);

        if(car.owner !== req.session.user.id){
            return res.redirect('/login')
        }

        if(car){
            res.render('edit', {car, title: `Edit Listing - ${car.name}`});
        }else{
            res.render('404' );
        }

    },
    async post(req, res){
        const id = req.params.id;
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price),
        }
        try {
            await req.storage.updateById(id, car, req.session.user.id);
            res.redirect('/');
        }catch (err) {
            console.log(err.message)
            res.redirect('/404');
        }
    }
}