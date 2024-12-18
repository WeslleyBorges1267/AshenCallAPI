const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});

db.connect((err, result) => {
    if(err){
        console.log('Erro ao se conectar com o banco:', err);
    }else{
        console.log('Conectado ao banco com sucesso:');
    }
});

module.exports = db;