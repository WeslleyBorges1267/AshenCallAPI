const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        "nome": "weslley"
    });
});

// Routes
const createAccount = require('./controller/createAccount');
app.use('/createAccount', createAccount);

const findPosition = require('./controller/findPosition');
app.use('/findPosition', findPosition);

module.exports = app;