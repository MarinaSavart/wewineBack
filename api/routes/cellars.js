const express = require('express');
const router = express.Router();

const cellarsController = require('../controller/cellarsController');
const checkAuth = require('../middlewares/check-auth');

// afficher toutes les caves
router.get('/', checkAuth, cellarsController.get_all_cellars);

// creation une cave
router.post('/create', checkAuth, cellarsController.create_cellar);

// modifier une cave
router.patch('/:cellarId', checkAuth, cellarsController.update_cellar);

// supprimer une cave
router.delete('/:cellarId', checkAuth, cellarsController.delete_cellar);

// ajouter une bouteille à la cave
router.post('/addBottle', checkAuth, cellarsController.add_bottle);

// enlever une bouteille d'une cave
router.delete('/:cellarId/:bottleId', checkAuth, cellarsController.remove_bottle);


module.exports = router;