const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const bottlesController = require('../controller/bottlesController');


// afficher tout les bouteilles
router.get('/', checkAuth, bottlesController.display_all_bottle);

// afficher un bouteille en founction de son id
router.get("/:id", checkAuth, bottlesController.display_one);

// create bottle
router.post('/', checkAuth, bottlesController.create_bottle);

// update bottle
router.patch('/:bottleId', checkAuth, bottlesController.update_bottle);

// delete bouttel
router.delete('/:bottleId', checkAuth, bottlesController.delete_bottle);

module.exports = router;