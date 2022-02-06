module.exports = {
    get(req, res) {
        res.render('create', {title: 'Car Listing'});
    },
    async post(req, res) {
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price),
            owner: req.session.user.id,
        }
        try{
            await req.storage.createCar(car);
            res.redirect('/');
        }catch (err) {
            console.error(err.message)
            res.redirect('/create');
        }

    }
}