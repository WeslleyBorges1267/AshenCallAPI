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

// Routes POST
const createAccount = require('./controller/createAccount');
app.use('/createAccount', createAccount);

const findPosition = require('./controller/findPosition');
app.use('/findPosition', findPosition);

const loginAccount = require('./controller/loginAccount');
app.use('/loginAccount', loginAccount);

// Routes GET
const getTypeCalled = require('./controller/get/getTypeCalled');
app.use('/getTypeCalled', getTypeCalled);

const getStatusCalled = require('./controller/get/getStatusCalled');
app.use('/getStatusCalled', getStatusCalled);

module.exports = app;