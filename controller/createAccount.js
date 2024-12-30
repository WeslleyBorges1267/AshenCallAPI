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
        const verifyEmail = await createUser.verifyEmail();
        if(verifyEmail != 0){
            res.status(409).json({statusCode: 409, msg: `O email ${createUser.email} já está em uso`});
        }else{
            createUser.password = await createUser.hashPassword();
            const dataDB = await createUser.createUser();
            res.status(dataDB.statusCode).json({statusCode: dataDB.statusCode, msg: dataDB.data});
        }
    }).catch((err) => {
        res.status(err.status).json({statusCode: err.status, msg: err.response.data.msg})
    })
});

module.exports = router;