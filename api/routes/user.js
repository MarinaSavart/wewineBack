const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const usersController = require('../controller/usersController');


// connexion
router.post('/login', usersController.signup);

// inscription
router.post("/register", usersController.signin);

// modifier un utilisateur
router.patch('/:userId', checkAuth, usersController.update_user);

// supprimer un utilisateur
router.delete('/:userId', checkAuth, usersController.delete_user);

// verify
router.get("/verify", checkAuth, usersController.verify_token)

// export router
module.exports = router;