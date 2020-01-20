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


module.exports = router;