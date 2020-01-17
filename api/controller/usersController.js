const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const JWT = require('jsonwebtoken');

// se connecter
exports.signup = (req, res, next) => {
    
    User.findOne({ mail: req.body.mail })
        .then(user => {
            if(!user){
                return res.status(409).json({
                    error: "L'utilisateur non trouvé"
                })
            }
            return bcrypt.compare(req.body.password, user.password, (err, isValid) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                if (isValid) {
                    res.status(200).json({
                        message: "Connexion successful!",
                        token: JWT.sign(
                            {
                                userId: user._id,
                                mail: user.mail
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "10h"
                            }
                        )
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid password"
                    });
                }
            });
        })
        .catch(err => {
            res.status(500).json({ 
                message: "Unse erreur est survenue",
                error: err
            });
        });
};

// creation d'un user
exports.signin = (req, res, next) => {
    
    // recherche si l'adresse mail existe deja
    User.find({ mail: req.body.mail })
    .then(users => {
        // si l'adresse mail existe alors on return une erreur
        if(users.length >= 1) {
            return res.status(409).json({
                error: 'le mail existe déjà'
            });
        } 
        return bcrypt.hash(req.body.password, 10);  // on return le cryptage du mot de passe
    })
    .then(hash => {
        
        // Sinon creation d'un nouveau user
        const user = new User({
            
            // rappel  des instences dans le model
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            mail: req.body.mail,
            password: hash
        });

        return user.save((err, isValid) => {    // sauvegarde du user

            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            if (isValid) {
                
                res.status(201).json({
                    message: 'Nouveau utilisateur',
                    // creation du token pour etre connecter
                    token: JWT.sign(
                        {
                            userId: user._id,
                            mail: user.mail
                        },
                        process.env.JWT_KEY,
                        {
                            // le token restera actif pendant 10h 
                            expiresIn: "10h"
                        }
                    )
                });
            }

        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
};

// update user
exports.update_user = (req, res, next) => {

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propsName] = ops.value;
    }

    User.update({ _id: req.params.userId }, { $set: updateOps})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

// delete user
exports.delete_user = (req, res, next) => {

    User.remove({ _id: req.params.userId})
        .then(result => {
            res.status(202).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.verify_token = (req, res, next) => {

    res.status(200).json({
        isVerified: true,
        data: req.userData
    });

}