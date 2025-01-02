const express = require('express');
const router = express.Router();
const Called = require('./../../model/classes/Called');

router.get('/', async (req, res) => {
    const getStatusCalled = new Called();
    try{
        const statusCalled = await getStatusCalled.getStatusCalled();
        res.status(200).json({statusCode: 200, msg: statusCalled});
    }catch(exception){
        console.log(`Erro ao solicitar os Tipos de chamado a Classe`);
    }
});

module.exports = router;