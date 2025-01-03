const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('./../../dotenv');
const User = require('./../../model/classes/User');

router.post('/', async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if(Object.getPrototypeOf(cookies) == null){
        res.status(404).json({statusCode: 404, msg: "Token de autenticação não encontrado"});
    }else{
        try {
            const tokenData = jwt.verify(cookies['ashenCallToken'], process.env.JWTSECRET)
            const verifyUser = new User();
            console.log('tokienData:', tokenData);
            try {
                const dbResponse = await verifyUser.verifyUserExist(tokenData['idUser'], tokenData['emailUser']);
                if(dbResponse.length == 1){
                    res.status(200).json({"veredito": "Pode criar chamado"});
                }else{
                    res.status(200).json({"Veredito": "Não pode"});
                }
            }catch(exception){
                console.log('erro ao verificar se o usuário existia: ', exception);
            }
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(440).json({statusCode: 440, msg: "Sua sessão expirou, por favor, realize login novamente"});
            } else if (err.name === 'JsonWebTokenError') {
                res.status(400).json({statusCode: 400, msg: "Token de sessão inválido"});
            } else {
                res.status(200).json({statusCode: 200, msg: "Erro ao verificar o token de sessão"});
            }
            return null;
        }

        //const tokenData = jwt.verify(cookies['ashenCallToken'], process.env.JWTSECRET)
    }
    /*
    if(!cookies.hasOwnProperty('ashenCallToken')){
        res.status(404).json({statusCode: 404, msg: "Token de autenticação não encontrado"});
    }else{
        const tokenData = jwt.verify(cookies['ashenCallToken'], process.env.JWTSECRET)
        const verifyUser = new User();
        console.log('tokienData:', tokenData);
        try {
            const dbResponse = await verifyUser.verifyUserExist(tokenData['idUser'], tokenData['emailUser']);
            if(dbResponse.length == 1){
                res.status(200).json({"veredito": "Pode criar chamado"});
            }else{
                res.status(200).json({"Veredito": "Não pode"});
            }
        }catch(exception){
            console.log('erro ao verificar se o usuário existia: ', exception);
        }
    }
    */
        
});

module.exports = router;