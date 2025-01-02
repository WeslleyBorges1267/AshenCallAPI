const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

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

const loginAccount = require('./controller/loginAccount');
app.use('/loginAccount', loginAccount);

module.exports = app;