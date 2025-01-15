const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).json("own called");
});

module.exports = router;