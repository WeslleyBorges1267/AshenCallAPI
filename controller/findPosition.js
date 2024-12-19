const express = require('express');
const router = express.Router();
const Position = require('../model/classes/Positions');

router.post('/', async (req, res) => {
    const {idPosition} = req.body;
    const getPosition = new Position();
    const dataPosition = await getPosition.findPosition(idPosition);
    let msg = null;
    if(dataPosition.data){
        msg = "Cargo encontrado";
    }else{
        msg = "Cargo não encontrado";
    }
    res.status(dataPosition.statusCode).json({statusCode: dataPosition.statusCode, msg: msg});
});

module.exports = router;