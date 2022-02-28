const router = require('express').Router();
const api = require('../sevices/catalog')
const mapErrors = require("../util/mappers");

const {isAuth, isOwner} = require("../middleware/guards");
const preload = require("../middleware/preload");


router.get('/', async (req, res) => {

    const data = await api.getAll();
    res.status(200).json(data);
});

router.post('/', isAuth(),async (req, res) => {

    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,
        owner: req.user._id
    };
    try {
        const result = await api.create(item);
        res.status(201).json(result);
    } catch (err) {
        console.log(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})
    }

});

router.get('/:id', preload(), (req, res) => {

    const item = res.locals.item;
    res.status(200).json(item);

});

router.put('/:id',preload(), isOwner(),async (req, res) => {
    const id = req.params.id;

    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,

    };
    try {
        const updatedItem = await api.update(id, item);
        res.json(updatedItem);
    } catch (err) {
        console.log(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})
    }
});

router.delete('/:id', preload(), isOwner(),async (req, res) => {
    const id = req.params.id;

    try {
        await api.deleteById(id);
        res.status(204).end();
    } catch (err) {
        console.log(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})
    }
});


module.exports = router;