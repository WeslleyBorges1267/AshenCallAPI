const db = require('./../conect');
class Called {
    constructor(idCalled, titleCalled, describeCalled, typeCalled, statusCalled, responsibleGroup) {
        this.idCalled = idCalled;
        this.titleCalled = titleCalled
        this.describeCalled = describeCalled
        this.typeCalled = typeCalled
        this.statusCalled = statusCalled
        this.responsibleGroup = responsibleGroup
    }

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