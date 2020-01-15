const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Bottle = require('../models/bottle');

// afficher tout les bouteilles
router.get('/', (req, res, next) => {

    res.status(200).json({
        message: "Tu vois toute les bouteilles"
    })
});

// afficher un bouteille en founction de son id
router.get("/:id", (req, res, next) => {

    res.status(200).json({
        message: "Tu vois une seule bouteille en fonction de son id",
        id: req.params.id
    })
});

// create bottle
router.post('/', (req, res, next) => {

    const bottle = new Bottle({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        domain: req.body.domain,
        vintage: req.body.vintage,
        description: req.body.description
    });

    bottle.save()
        .then(result => {
            
            console.log(result);
            res.status(201).json({
                message: "Tu as créé une bouteille",
                newBottle: bottle
            })
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            })
        });
    /*     .then(result => console.log(result))
    //     .catch(err => console.log(err));

    // res.status(200).json({
    //     message: "Tu vois toute les bouteilles",
    //     newBottle: bottle
     }) */
});

// update bottle
router.patch('/:bouttleID', (req, res, next) => {

    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.proposName] = ops.value;
    }

    Bottle.update({ _id: req.params.bottleId}, { $set: updateOps})
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

// delete bouttel
router.delete('/:bottleId', (req, res, next) => {
    
    Bottle.remove({ _id: req.params.bottleId})
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