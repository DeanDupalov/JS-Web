//TODO replace with actual service;
const {getTripById} = require("../sevices/trip");


function preload(populate) {
    return async (req, res, next) => {
        const id = req.params.id;
        //TODO change property name to match collection
        if(populate){

        }else{
            const trip = await getTripById(id);
            res.locals.trip = trip;
        }
        next();
    }
}

module.exports = preload;