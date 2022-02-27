const router = require('express').Router();
const api = require('../sevices/catalog')
const mapErrors = require("../util/mappers");
const {getById} = require("../sevices/catalog");


router.get('/', async (req, res) => {
    const data = await api.getAll()
    res.status(200).json(data);
});

router.post('/', async (req, res) => {
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material
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

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await api.getById(id);
    res.status(200).json(item);

});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material
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

router.delete('/:id', async (req, res) => {
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