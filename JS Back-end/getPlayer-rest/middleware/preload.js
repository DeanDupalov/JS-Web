const {getById} = require("../sevices/catalog");

module.exports = () => async function (req, res, next) {

    const id = req.params.id;
    try{
        const game = await getById(id).lean();
        game._creatorId = game.creator;
        res.locals.game = game;
        next();
    }catch (err) {
        res.status(404).json({message: 'Record not found.'})
    }

}