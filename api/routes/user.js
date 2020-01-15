// import express
const express = require('express');
// import router
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.post("/", (req, res, next) => {

    // Reponse avec un status a 200  avec la reponse en json
    res.status(200).json({
        message: "Un user (moi lul)!",
    })
});


// login
router.post('/login', (req, res, next) => {

    res.status(200).json({
        message: "Tu es dans le Login"
    });
});

// creation d'un user
router.post("/register", (req, res, next) => {

    const user = new User({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        mail: req.body.mail,
        password: req.body.password
    });
    user.save()
    .then(result => {
        console.log(result);

        res.status(200).json({
            message: "le compte est créer"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
    
});

// update user
router.patch('/:userId', (req, res, next) => {

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propsName] = ops.value;

    }

    User.update({ _id: req.params.userId }, { $set: updateOps})
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

// delete un user
router.delete('/:userId', (req, res, next) => {

    User.remove({ _id: req.params.userId})
        .then(result => {
            console.log(result);

            res.status(202).json(result);
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            })
        })
});

// export router
module.exports = router;