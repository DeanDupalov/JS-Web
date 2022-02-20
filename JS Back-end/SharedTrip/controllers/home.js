const {getAllTrips, getTripById, getTripsByUser} = require("../sevices/trip");
const {isUser} = require("../middleware/guards");
const {getUserById} = require("../sevices/user");
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Home Page'})
});

router.get('/profile', isUser(),async (req, res) => {
    const id = req.session.user._id;
    const user = await getUserById(id);
    const tripsByUser = await getTripsByUser(id);
    // if(user.gender == 'male'){
    //     user.isMale = true
    // }
    console.log(user)


    res.render('profile', {title: 'Profile Page', user, tripsByUser})

});

router.get('/trips', async (req, res) => {
    const trips = await getAllTrips();
    res.render('shared-trips', {title: 'Shared Trips', trips})
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const trip = await getTripById(id);
    trip.buddiesList = trip.bodies.map(b => b.email).join(', ')


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

    console.log(trip)
    res.render('trip-details', {trip})
});

module.exports = router;