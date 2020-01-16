// import express
const express = require('express');
// import router
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const usersController = require('../controller/usersController');


// login
router.post('/login', usersController.signup);

// creation d'un user
router.post("/register", usersController.signin);

// update user
router.patch('/:userId', checkAuth, usersController.update_user);

// delete un user
router.delete('/:userId', checkAuth, usersController.delete_user);

// export router
module.exports = router;