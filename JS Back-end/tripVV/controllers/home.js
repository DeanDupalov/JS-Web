const {getAllTrips, getTripById} = require("../sevices/trip");
const {isUser} = require("../middleware/guards");
const {getUserById} = require("../sevices/user");
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Home Page'})
});

router.get('/profile', isUser(),async (req, res) => {
    const id = req.session.user._id;
    const user = await getUserById(id);
    if(user.gender == 'male'){
        user.isMale = true
    }
    console.log(user)

    res.render('profile', {title: 'Profile Page', user})

});

router.get('/trips', async (req, res) => {
    const trips = await getAllTrips();
    res.render('shared-trips', {trips})
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const trip = await getTripById(id);
    console.log(trip)


    if(req.session.user){
        const user = req.session.user._id;
        trip.hasUser = true;
        if(user == trip.creator._id){
            trip.isCreator = true;
        } else if(trip.seats == 0 ) {
            trip.noSeats = true;
        } else {
            trip.isReserved = trip.bodies.find(b => b._id == req.session.user._id) != undefined;
        }
    }
    console.log('hasUser ' + trip.hasUser);
    console.log('isCreator ' + trip.isCreator);
    console.log('noSeats ' + trip.noSeats);
    console.log('isReserved ' + trip.isReserved);
    res.render('trip-details', {trip})
});

module.exports = router;