const express = require('express');
const router = express.Router();
const cellarsController = require('../controller/cellarsController');

const checkAuth = require('../middlewares/check-auth');

// route pour afficher tout les boutelles
router.get('/', checkAuth, cellarsController.display_all_cellars);

// recupérer une cave par son id
router.get('/:cellarId',  checkAuth, cellarsController.display_one);

// creation d'une cave
router.post('/create', checkAuth, cellarsController.create_cellar);

// update cellar
router.patch('/:cellarId', checkAuth, cellarsController.update_cellar );

// delete une cave
router.delete('/:cellarId', checkAuth, cellarsController.delete_cellar);

module.exports = router;