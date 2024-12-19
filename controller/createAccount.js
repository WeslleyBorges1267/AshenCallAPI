const express = require('express');
const router = express.Router();
const User = require('../model/classes/User');
const axios = require('axios');

router.post('/', async (req, res) => {
    const {name, email, password, idPosition} = req.body;
    const data = {idPosition: idPosition};
    axios.post('http://127.0.0.1:3000/findPosition', data).then(async (result) => {
        // Caso o cargo sejá encontrado, cria o usuário;
        const createUser = new User(name, email, password, idPosition);
        const dataDB = await createUser.createUser();
        res.status(dataDB.statusCode).json({statusCode: dataDB.statusCode, msg: dataDB.data});
    }).catch((err) => {
        res.status(err.status).json({statusCode: err.status, msg: err.response.data.msg})
    })
});

module.exports = router;