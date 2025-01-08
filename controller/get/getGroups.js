const express = require('express');
const router = express.Router();
const Group = require('./../../model/classes/Group');

router.get('/', async (req, res) => {
    const getGroup = new Group();
    try {
        const Groups = await getGroup.getGroups();
        res.status(200).json({statusCode: 200, msg: Groups})
    }catch(exception) {
        console.log('Erro ao buscar os Grupos na classe:', exception);
        res.status(500).json({statusCode: 500, msg: "Erro ao tentar solicitar os grupos de usuários"})
    }
});

module.exports = router;