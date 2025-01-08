const db = require('./../conect');

class Group {
    getOneGroup(idGroup) {

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