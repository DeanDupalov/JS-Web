const Trip = require('../models/Trip');

async function createTrip(trip) {
    const result = new Trip(trip);
    await result.save();

    return result;
}
async function getAllTrips() {
    const trips = await Trip.find({}).lean();

    return trips;
}
async function getTripsByUser(userId) {
    const trips = await Trip.find({creator: userId}).lean();

    return trips;
}

async function getTripById(id) {
    return Trip.findById(id)
        .populate('creator', 'email')
        .populate('bodies', 'email')
        .lean();
}

async function updateTrip(id, trip) {
    const existing = await Trip.findById(id);

    existing.startPoint = trip.startPoint.trim();
    existing.endPoint = trip.endPoint.trim();
    existing.date = trip.date.trim();
    existing.time = trip.time.trim();
    existing.carImage = trip.carImage.trim();
    existing.carBrand = trip.carBrand.trim();
    existing.seats = trip.seats.trim();
    existing.price = trip.price.trim();
    existing.description = trip.description.trim();

    await existing.save();
    return true
}

async function deleteTripById(id) {
    return Trip.findByIdAndDelete(id)
}

async function reserveSeat(userId, tripId) {
    const trip = await Trip.findById(tripId);

    if(trip.seats.length == 0){
        throw new Error('No seats available.')
    }

    if(trip.bodies.includes(userId)){
        throw new Error('User is already reserved a seat.')
    }
    trip.bodies.push(userId);
    trip.seats -= 1

    await trip.save();
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripsByUser,
    getTripById,
    reserveSeat,
    updateTrip,
    deleteTripById
}
