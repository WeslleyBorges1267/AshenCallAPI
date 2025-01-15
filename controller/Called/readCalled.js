const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).json("teste na rota dos chamados");
});

module.exports = router;