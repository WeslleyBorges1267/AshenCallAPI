const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('./../../dotenv');
const User = require('./../../model/classes/User');
const Called = require('./../../model/classes/Called');

router.post('/', async (req, res) => {
    const {titleCalled, describeCalled, typeCalled, statusCalled, responsibleGroup} = req.body;
    const cookies = req.cookies;
    if(Object.getPrototypeOf(cookies) == null){
        res.status(404).json({statusCode: 404, msg: "Token de autenticação não encontrado"});
    }else{
        try {
            const tokenData = jwt.verify(cookies['ashenCallToken'], process.env.JWTSECRET)
            //const verifyUser = new User({idCalled: null, titleCalled: null, describeCalled: null, typeCalled: null, statusCalled: null, responsibleGroup: null});
            const verifyUser = new User();
            try {
                const dbResponse = await verifyUser.verifyUserExist(tokenData['idUser'], tokenData['emailUser']);
                if(dbResponse.length == 1){
                    const createCalled = new Called({idCalled: null, titleCalled: titleCalled, describeCalled: describeCalled, typeCalled: typeCalled, statusCalled: statusCalled, responsibleGroup: responsibleGroup});
                    const responseCreateCalled = await createCalled.createCalled();
                    console.log(responseCreateCalled)
                    res.status(responseCreateCalled.statusCode).json({msg: responseCreateCalled.msg});
                }else{
                    res.status(404).json({statusCode: 404, msg: "Usuário não encontrado"});
                }
            }catch(exception){
                console.log('erro ao verificar se o usuário existia: ', exception);
                res.status(exception.statusCode).json({statusCode: exception.statusCode, msg: "Erro de requisição"});
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

    }
        
});

module.exports = router;