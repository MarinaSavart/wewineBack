const mongoose = require('mongoose');
const Cellar = require('../models/cellar');
const Bottle = require('../models/bottle');
const BottleCellar = require('../models/bottleCellar');

// afficher toute les caves
exports.display_all_cellars = (req, res, next) => {

    console.log(req.userData);

    Cellar.find({

        userId: req.userData.userId
        })
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
};

// afficher une cave avec son id
exports.display_one = (req, res, next) => {
    Cellar.find({
            _id: req.params.cellarId,
            userId: req.userData.userId
        })
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
};

exports.get_content = (req, res, next) => {
    BottleCellar.find({
            idCellar: req.params.cellarId
        })
        .then(doc => {
            var bottles = [];
            doc.forEach(bottle => {
                Bottle.findById(bottle.idBottle, (err, document) => {
                    bottles.push(document);
                    res.status(200).json({
                        bottles: bottles
                    })
                })
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
}

exports.add_bottle_in_cellar = (req, res, next) => {
    const bottle = new BottleCellar({
        idCellar: req.body.idCellar,
        idBottle: req.body.idBottle
    });

    bottle.save()
        .then(result => {
            res.status(201).json({
                message: result
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
}


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
        updateOps[ops.propsName] = ops.value;
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