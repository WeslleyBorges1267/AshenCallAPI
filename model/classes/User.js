const db = require('./../conect');
class User {
    constructor(name, email, password, idPosition) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.idPosition = idPosition;
    }

    createUser(){
        return new Promise((resolve, reject) => {
            const createSQL = `INSERT INTO users values (default, '${this.name}', '${this.email}', '${this.password}', '${this.idPosition}')`;
            const createQuery = db.query(createSQL, (err, result) => {
            if(err){
                console.log('Erro ao tentar criar usuário de email:', this.email, err);
                reject({statusCode: 500, data: `Erro ao tentar criar usuário de email ${this.email}:`, err});
            }else{
                resolve({statusCode: 201, data: "Usuário criado com sucesso"});
            }
        })
        })
    }
}
module.exports = User;