// import express
const express = require('express');
// import router
const router = express.Router();

router.post("/", (req, res, next) => {

    // Reponse avec un status a 200  avec la reponse en json
    res.status(200).json({

        message: "Un user (moi lul)!",
    })
});

// export router
module.exports = router;