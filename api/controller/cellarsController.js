const mongoose = require('mongoose');

const Cellar = require('../models/cellar');

// afficher toute les caves
exports.get_all_cellars = (req, res, next) => {

    console.log(req.userData);

    Cellar.find({
        userId: req.userData.userId
    })
        .populate('Bottle')
        .then(cellars => {
            console.log(cellars);

            res.status(200).json({
                count: cellars.length,
                cellars: cellars.map(cellar => ({
                    _cellarId: cellar._id,
                    name: cellar.name,
                    maxContent: cellar.maxContent,
                    bottles: cellar.bottlesId
                }))
            });
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            })
        })
};

// creer une cave
exports.create_cellar = (req, res, next) => {
    const cellar = new Cellar({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        maxContent: 46,
        userId: req.userData.userId
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
};

// modifier une cave
exports.update_cellar = (req, res, next) => {

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Cellar.update({
            _id: req.params.cellarId,
            userId: req.userData.userId
        }, {
            $set: updateOps
        })
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

// supprimer une cave
exports.delete_cellar = (req, res, next) => {
    // take id user dans id cellar
    Cellar.remove({
            _id: req.params.cellarId,
            userId: req.userData.userId
        })
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