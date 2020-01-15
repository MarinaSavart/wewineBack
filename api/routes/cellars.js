const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {

    res.status(200).json({

        message: "tu vois tout tes caves a toi !",
    });
});

router.post('/content', (req, res, next) => {

    res.status(200).json({
        message: "tu es dans une cave ( cave cuisine !)"
    });
});

module.exports = router;