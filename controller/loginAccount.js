const express = require('express');
const router = express.Router();
const User = require('./../model/classes/User');
const jwt = require('jsonwebtoken');
//const cookieParser = require('cookie-parser');
//router.use(cookieParser());

router.post('/', async (req, res) => {
    const {email, password} = req.body;
    const loginUser = new User(null, email, password, null);
    const verifyEmail = await loginUser.verifyEmail();
    if(verifyEmail === 1){
        const verifyPassword = await loginUser.verifyPassword();
        if(verifyPassword === true){
            const dataUser = await loginUser.getDataUser();
            const token = jwt.sign({
                idUser: dataUser['idUser'],
                email: dataUser['emailUser'],
            }, process.env.JWTSECRET, {expiresIn: "24h"});
            res.cookie("ashenCallToken", token, {expires: new Date(Date.now() + 86400000), httpOnly: true});
            res.status(202).json({statusCode: 202, msg: "Logado com sucesso!"});
        }else{
            res.status(404).json({statusCode: 404, msg: "Email ou senha incorreto"});
        }
    }else{
        res.status(404).json({statusCode: 404, msg: "Email ou senha incorreto"});
    }
});

module.exports = router;