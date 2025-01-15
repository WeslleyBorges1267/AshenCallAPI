const db = require('./../conect');

class Group {
    getVerifyGroup(idGroup) {
        return new Promise((resolve, reject) => {
            try{
                const selectSQL = `SELECT * FROM grupos WHERE idGrupo = '${idGroup}'`;
                const querySQL = db.query(selectSQL, (err, result) => {
                    if(result.length === 1) {
                        resolve(true);
                    }else{
                        reject(false);
                    };
                });
            }catch(e){
                console.log('aaa', e);
            }
        });
    }

    getGroups() {
        return new Promise((resolve, reject) => {
            const selectSQL = `SELECT * FROM grupos`;
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

module.exports = Group;