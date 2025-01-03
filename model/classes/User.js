const db = require('./../conect');
const bcrypt = require('bcrypt');
class User {
    constructor(name, email, password, idPosition) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.idPosition = idPosition;
    }

    getDataUser() {
        return new Promise((resolve, reject) => {
            const selectSQL = `SELECT * FROM users WHERE emailUser = '${this.email}'`;
            const querySQL = db.query(selectSQL, (err, result) => {
                if(err){
                    console.log(`Erro ao buscar os dados do usuário de email ${this.email}: ${err}`);
                    reject(err);
                }else{
                    resolve(result[0]);
                }
            });
        })
    }

    verifyUserExist(idUser, email) {
        return new Promise((resolve, reject) => {
            const selectSQL = `SELECT idUser, emailUser FROM users WHERE idUser = '${idUser}' AND emailUser = '${email}'`;
            const querySQL = db.query(selectSQL, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }

    hashPassword() {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(parseInt(process.env.BCRYPTSALTS), (err, salt) => {
                if(err){
                    reject(err)
                }else{
                    bcrypt.hash('123', salt, (err, hash) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(hash);
                        }
                    })
                }
            })
        })
    }

    verifyEmail() {
        return new Promise((resolve, reject) => {
            const selectSQL = `SELECT idUser, emailUser, passwordUser FROM users WHERE emailUser = '${this.email}'`;
            const querySQL = db.query(selectSQL, (err, result) => {
                if(err){
                    console.log(`Erro na verificação de existência do email ${this.email}: ${err}`);
                    reject(err);
                }else{
                    resolve(result.length);
                }
            });
        })
    }

    verifyPassword() {
        return new Promise((resolve, reject) => {
            const selectSQL = `SELECT idUser, passwordUser FROM users WHERE emailUser = '${this.email}'`;
            const querySQL = db.query(selectSQL, (err, result) => {
                if(err){
                    console.log(`Erro ao verificar a senha do email ${this.email}`);
                    reject(err)
                }else{
                    bcrypt.compare(this.password, result[0]['passwordUser'], (err,result) => {
                        if(err){
                            console.log(`Erro ao verificar a senha do email ${this.email}`);
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    })
                }
            })
        })
    }

    createUser() {
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