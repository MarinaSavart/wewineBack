const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {

    res.status(200).json({
        message: "Tu es dans le Login"
    });
});

module.exports = router;