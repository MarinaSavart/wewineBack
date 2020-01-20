const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const bottlesController = require('../controller/bottlesController');


// afficher toute les bouteilles
router.get('/', checkAuth, bottlesController.get_all_bottles);

// afficher un bouteille en founction de son id
router.get("/:id", checkAuth, bottlesController.get_one);

// creer une bouteille
router.post('/', checkAuth, bottlesController.create_bottle);

// modifier une bouteille
router.patch('/:bottleId', checkAuth, bottlesController.update_bottle);

// supprimer une bouteille
router.delete('/:bottleId', checkAuth, bottlesController.delete_bottle);

module.exports = router;