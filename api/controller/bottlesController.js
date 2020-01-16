const mongoose = require('mongoose');
const Bottle = require('../models/bottle');


// afficher toute les bouteilles
exports.display_all_bottle = (req, res, next) => {

    Bottle.find()
        .select("name domain vintage description _id")
        .then(bottles => {
            res.status(200).json({
                count: bottles.length,
                bottles: bottles.map(bottle => ({
                    bottle: bottle,
                    request: {
                        type: "GET",
                        url: "http://localhost:8000/bottles/" + bottle._id
                    }
                }))
            });
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            });
        });
};

// afficher une bouteille en founction de son id
exports.display_one = (req, res, next) => {
    Bottle.findById({ _id: req.params.id })
    .then( doc => {
        console.log("From database", doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

// creer une bouteille
exports.create_bottle = (req, res, next) => {

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
};

// modifier une bouteille
exports.update_bottle = (req, res, next) => {

    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propsName] = ops.value;
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
};

// supprimer une bouteille
exports.delete_bottle = (req, res, next) => {
    
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
};