const {isUser, isOwner} = require("../middleware/guards");
const mapErrors = require("../util/mappers");
const {createHouse, getHouseById, rentHouse, updateHouse, deleteHouseById} = require("../sevices/housing");

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Add House Listing'});
});
router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;

    const house = {
        homeName: req.body.homeName.trim(),
        type: req.body.type.toLowerCase().trim(),
        year: req.body.year.trim(),
        city: req.body.city.trim(),
        image: req.body.image.trim(),
        description: req.body.description.trim(),
        availablePieces: req.body.availablePieces.trim(),
        owner: userId,
    };

    try {
        await createHouse(house);
        res.redirect('/catalog');
    } catch (err) {
        console.log('Create house' + err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Add House Listing', errors, data: house})
    }

});

router.get('/edit/:id', isUser(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const house = await getHouseById(id);

    res.render('edit', {title: 'Edit House', house})

});

router.post('/edit/:id', isUser(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const house = {
        homeName: req.body.homeName.trim(),
        type: req.body.type.trim(),
        year: req.body.year.trim(),
        city: req.body.city.trim(),
        image: req.body.image.trim(),
        description: req.body.description.trim(),
        availablePieces: req.body.availablePieces.trim(),
    };

    try {
        await updateHouse(id, house);
        res.redirect('/details/' + id);


    } catch (err) {
        console.log(req.body)
        console.log('Edit controller' + err);
        const errors = mapErrors(err);
        res.render('edit', {title: 'Edit Trip', errors, house})
    }

});

router.get('/delete/:id', isUser(), isOwner(), async (req, res) => {
    const id = req.params.id;

    try {
        await deleteHouseById(id);
        res.redirect('/catalog');

    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('details', {title: 'Details Page', errors, })
    }

});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const house = await getHouseById(id);
    house.rentedList = house.rented.map(b => b.name).join(', ')


    if (req.session.user) {
        const user = req.session.user._id;
        house.hasUser = true;

        if (user == house.owner._id) {
            house.isOwner = true;
        } else if (house.availablePieces == 0) {
            house.isFull = true;
        } else {
            house.isBooked = house.rented.find(b => b._id == req.session.user._id) != undefined;
        }
    }
    console.log('hasUser ' + house.hasUser);
    console.log('isCreator ' + house.isOwner);

    console.log(house)
    res.render('details', {house})
});

router.get('/rent/:id', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const houseId = req.params.id;

    try {
        await rentHouse(userId, houseId);

        res.redirect('/details/' + houseId)

    } catch (err) {
        console.log('Rent a house' + err);
        const errors = mapErrors(err);
        res.render('details', {title: 'Details page', errors})
    }

});

module.exports = router;