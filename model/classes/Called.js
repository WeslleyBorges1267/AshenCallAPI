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

    getOwnCalled(idUser, statusCalled) {
        return new Promise((resolve, reject) => {
            const selectSQL = `SELECT idGrupo FROM grupoUsuarios WHERE idUsuario = '${idUser}'`;
            const querySQL = db.query(selectSQL, (err, result) => {
                if(err){
                    console.log(`Erro ao buscar chamados do usuário de id ${idUser}:`, err);
                }else{
                    let grupos = [];
                    for(let i = 0; i < result.length; i++){
                        grupos.push(result[i]['idGrupo']);
                    }
                    
                    console.log(grupos);
                    let grupoResponsavel = '';
                    for(let i = 0; i < grupos.length; i++){
                        if(i == grupos.length - 1){
                            grupoResponsavel += `grupoResponsavel = ${grupos[i]}`;
                        }else{
                            grupoResponsavel += `grupoResponsavel = ${grupos[i]} || `;
                        }
                    }
                    const selectSQL2 = `SELECT * FROM chamados WHERE statusChamado = '${statusCalled}' && (${grupoResponsavel})`;
                    const querySQL2 = db.query(selectSQL2, (err, result) => {
                        if(err){
                            console.log(`Erro ao buscar chamados do usuário de id ${idUser} grupo(s) ${grupos}`);
                        }else{
                            resolve(result);
                        }
                    })
                }
            });
        });
    };   

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