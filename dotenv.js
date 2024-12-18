const dotenv = require('dotenv');
const envConfig = dotenv.config({path: "./.env.local"});

module.exports = envConfig;