// Lista os chamados abertos ao qual o usuário pertence;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('../../dotenv');
const Called = require('../../model/classes/Called');

router.post('/', async (req, res) => {
    const token = req.cookies;
    console.log("Token:", token);
    const data = jwt.verify(token['ashenCallToken'], process.env.JWTSECRET);
    console.log(data);
    const readOwnCalled = new Called();
    const ownCalled = await readOwnCalled.getOwnCalled(data['idUser'], 1);
    res.status(200).json(ownCalled);
});

module.exports = router;