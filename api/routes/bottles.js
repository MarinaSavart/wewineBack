const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.status(200).json({
        message: "Tu vois toute les bouteilles"
    })
});

router.get("/:id", (req, res, next) => {

    res.status(200).json({
        message: "Tu vois une seule bouteille en fonction de son id",
        id: req.params.id
    })
});

module.exports = router;