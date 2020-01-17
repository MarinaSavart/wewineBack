const express = require('express');
const router = express.Router();
const cellarsController = require('../controller/cellarsController');
const checkAuth = require('../middlewares/check-auth');

// afficher toutes les caves
router.get('/', checkAuth, cellarsController.display_all_cellars);

// afficher une cave en fonction de son id
router.get('/:cellarId',  checkAuth, cellarsController.display_one);

// creation une cave
router.post('/create', checkAuth, cellarsController.create_cellar);

// modifier une cave
router.patch('/:cellarId', checkAuth, cellarsController.update_cellar );

// supprimer une cave
router.delete('/:cellarId', checkAuth, cellarsController.delete_cellar);

module.exports = router;