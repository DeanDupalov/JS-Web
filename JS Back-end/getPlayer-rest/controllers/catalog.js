const router = require('express').Router();
const api = require('../sevices/catalog')
const mapErrors = require("../util/mappers");

const { isAuth, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");


router.get('/', async (req, res) => {

    const data = await api.getAll();
    res.status(200).json(data);
});

router.post('/', isAuth(), async (req, res) => {

    const game = {
        name: req.body.name,
        members: req.body.members,
        town: req.body.town,
        address: req.body.address,
        description: req.body.description,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        creator: req.user._id
    };
    try {
        const result = await api.create(game);
        res.status(201).json(result);
        return result;

    } catch (err) {
        console.log(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error })
    }

});

router.get('/:id', preload(), (req, res) => {

    const game = res.locals.game;
    res.status(200).json(game);

});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;


    const game = {
        name: req.body.name,
        members: req.body.members,
        town: req.body.town,
        address: req.body.address,
        description: req.body.description,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
    };
    
    try {
        const updatedGame = await api.update(id, game);
        res.json(updatedGame);
        return updatedGame;
    } catch (err) {
        console.log(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error })
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    try {
        await api.deleteById(id);
        res.status(204).end();
    } catch (err) {
        console.log(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error })
    }
});


module.exports = router;