const {isUser} = require("../middleware/guards");
const mapErrors = require("../util/mappers");
const {createTrip, reserveSeat, getTripById, updateTrip, deleteTripById} = require("../sevices/trip");
const {addTripToUserHistory} = require("../sevices/user");

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Add Trip'});
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;

    const trip = {
        startPoint: req.body.startPoint.trim(),
        endPoint: req.body.endPoint.trim(),
        date: req.body.date.trim(),
        time: req.body.time.trim(),
        carImage: req.body.carImage.trim(),
        carBrand: req.body.carBrand.trim(),
        seats: req.body.seats.trim(),
        price: req.body.price.trim(),
        description: req.body.description.trim(),
        creator: userId,
    };

    try{
        await createTrip(trip);
        res.redirect('/trips');
    } catch (err) {
        console.log('Create trip' + err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Add Trip', errors, data: trip})
    }

});

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const trip = await getTripById(id);

    if(req.session.user._id != trip.creator._id){
        return res.redirect('/login');
    }

    if(trip){
        res.render('trip-edit', {title: 'Edit Rip', trip})
    }else{
        res.render('404', {title: '404'})
    }
});

router.post('/edit/:id', isUser(), async (req, res) =>  {
    const id = req.params.id;
    const existing = await getTripById(id);
    // TODO can create a isCreator middleware
    if(req.session.user._id != existing.creator._id){
        return res.redirect('/login');
    }
    const trip = {
        startPoint: req.body.startPoint.trim(),
        endPoint: req.body.endPoint.trim(),
        date: req.body.date.trim(),
        time: req.body.time.trim(),
        carImage: req.body.carImage.trim(),
        carBrand: req.body.carBrand.trim(),
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description.trim(),
    };

    try{
        await updateTrip(id, trip);
        res.redirect('/details/' + id);


    }catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('trip-edit', {title: 'Edit Trip', errors, trip})
    }

});

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const trip = await getTripById(id);

    if(req.session.user._id != trip.creator._id){
        return res.redirect('/login');
    }

    try{
        await deleteTripById(id);
        res.redirect('/trips');


    }catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('trip-details', {title: 'Details Page', errors, trip})
    }


});

router.get('/reserve/:id', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const tripId = req.params.id;

    try {
        await reserveSeat(userId, tripId);
        await addTripToUserHistory(userId, tripId);
        res.redirect('/details/'+ tripId)

    }catch (err) {
        console.log('Reserve trip' + err);
        const errors = mapErrors(err);
        res.render('details', {title: 'Details page', errors})
    }

});

module.exports = router;