const db = require('./../conect');
class Called {
    constructor({idCalled = null, titleCalled = null, describeCalled = null, typeCalled = null, statusCalled = null, responsibleGroup = null} = {}) {
        this.idCalled = idCalled;
        this.titleCalled = titleCalled;
        this.describeCalled = describeCalled;
        this.typeCalled = typeCalled;
        this.statusCalled = statusCalled;
        this.responsibleGroup = responsibleGroup;
    }

    createCalled() {
        return new Promise((resolve, reject) => {
            if(parseInt(this.typeCalled) && parseInt(this.statusCalled) && parseInt(this.responsibleGroup)){
                const createSQL = `INSERT INTO chamados values (default, '${this.titleCalled}', '${this.describeCalled}', '${this.typeCalled}', '${this.statusCalled}', '${this.responsibleGroup}')`;
                const querySQL = db.query(createSQL, (err, result) => {
                    if(err){
                        console.log('Erro ao tentar criar chamado de titulo:', this.titleCalled);
                        reject({statusCode: 500, msg: err});
                    }else{
                        resolve({statusCode: 201, msg: "Chamado criado com sucesso"});
                    }
                });   
            }else{
                reject({statusCode: 400, msg: "Tipo de chamado, Status ou Grupo responsávell não foi referenciado corretamente"});
            }
        })
    }

    getVerifyTypeCalled(idTypeCalled) {
        return new Promise((resolve, reject) => {
            const selectSQL = `SELECT * FROM tipoChamado WHERE idTipoChamado = '${idTypeCalled}'`;
            const querySQL = db.query(selectSQL, (err, result) => {
                if(result.length === 1) {
                    resolve(true);
                }else{
                    reject(false);
                };
            });
        });
    };

    getTypeCalled() {
        return new Promise((resolve, reject) => {
            const selectSQL = "SELECT * FROM tipoChamado";
            const querySQL = db.query(selectSQL, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }

    getVerifyStatusCalled(idStatusCalled) {
        return new Promise((resolve, reject) => {
            const selectSQL = `SELECT * FROM statusChamado WHERE idTipoChamado = '${idStatusCalled}'`;
            const querySQL = db.query(selectSQL, (err, result) => {
                if(result.length === 1) {
                    resolve(true);
                }else{
                    reject(false);
                };
            });
        });
    }

    getStatusCalled() {
        return new Promise((resolve, reject) => {
            const selectSQL = "SELECT * FROM statusChamado";
            const querySQL = db.query(selectSQL, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
}

module.exports = Called;