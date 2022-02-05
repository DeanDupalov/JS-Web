module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [car, accessories] = await Promise.all([
                await req.storage.getCarById(id),
                await req.accessory.getAllAccessories()
            ]);
            const exisingIds = car.accessories.map(a => a.id.toString());
            const availableAccessories = accessories.filter(a => exisingIds.includes(a.id.toString()) === false);

            res.render('attachAccessory', {car, accessories: availableAccessories, title: `Attach a new accessory`});
        } catch (err) {
            console.log(err.message)
            res.render('404');
        }

    },
    async post(req, res) {
        const carId = req.params.id;
        const accessoryId = req.body.accessory;
        try {
            await req.storage.attachAccessory(carId, accessoryId)
            res.redirect('/details/' + carId)
        } catch (err) {
            console.log('Error attaching accessory');
            console.log(err.message);
            res.redirect('/attach/' + carId)
        }


    }
}