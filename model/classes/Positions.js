const db = require('./../conect');
class Positions {
    getPositions() {
        const getPositionsSQL = "SELECT * FROM cargos";
        const getPositionsQuery = db.query(getPositionsSQL, (err, result) => {
            if(err){
                console.log('Erro ao requisitar os cargos:', err);
            }else{
                console.log('Cargos disponiveis no momento:', result);
            }
        })
    }

    findPosition(idPosition){
        return new Promise((resolve, reject) => {
            const findPositionSQL = `SELECT idCargo FROM cargos WHERE idCargo = '${idPosition}'`;
            const findPositionQuery = db.query(findPositionSQL, (err, result) => {
                if(err){
                    console.log(`Erro ao buscar pelo cargo de id: ${idPosition}, ${err}`);
                    reject({statusCode: 500, data: "Erro ao buscar pelo cargo de id:", idPosition});
                }else{
                    if(result.length == 1){
                        resolve({statusCode: 200, data: true})
                    }else{
                        resolve({statusCode: 404, data: false})
                    }
                }
            })
        })
        
    }
};

module.exports = Positions;