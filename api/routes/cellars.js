const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cellar = require('../models/cellar');


router.get('/', (req, res, next) => {
    Cellar.find()
        .then(docs => {
            console.log(docs);

            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            })
        })
});

// recupérer une cave par son id
router.get('/:cellarId', (req, res, next) => {
    Cellar.findById(req.params.cellarId)
        .then(doc => {
            console.log("From database:", doc);

            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            })
        });
});

// creation d'une cave
router.post('/', (req, res, next) => {
    const cellar = new Cellar({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        maxContent: 46
    });

    cellar.save()
        .then(resultat => {
            console.log(resultat);

            res.status(201).json({
                message: "Tu as creer une cave",
                newCellar: cellar
            })
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            })
        });

    
});

// update cellar
router.patch('/:cellarId', (req, res, next) => {
    
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.proposName] = ops.value;
    }

    Cellar.update({ _id: req.params.cellarId}, { $set: updateOps})
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

// delete une cave
router.delete('/:cellarId', (req, res, next) => {
    Cellar.remove({ _id: req.params.cellarId })
        .then(result => {
            console.log(result);

            res.status(202).json(result);
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;