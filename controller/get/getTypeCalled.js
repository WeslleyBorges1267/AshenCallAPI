const express = require('express');
const router = express.Router();
const Called = require('./../../model/classes/Called');

router.get('/', async (req, res) => {
    const getTypeCalled = new Called();
    try{
        const typeCalled = await getTypeCalled.getTypeCalled();
        res.status(200).json({statusCode: 200, msg: typeCalled});
    }catch(exception){
        console.log(`Erro ao solicitar os Tipos de chamado a Classe`);
    }
});

module.exports = router;