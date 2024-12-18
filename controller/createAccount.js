const express = require('express');
const router = express.Router();
const User = require('../model/classes/User');

router.get('/', async (req, res) => {
    const {name, email, password, idPosition} = req.body;
    const createUser = new User(name, email, password, idPosition);

    const dataDB = await createUser.createUser();

    res.status(dataDB.statusCode).json({data: dataDB.data});
});

module.exports = router;