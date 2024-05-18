const db = require("../config/db")


class Train{
    constructor(trainNo , trainName , fromName , toName , totalCapacity , fromStationNumber , toStationNumber){
        this.trainNo = trainNo;
        this.trainName = trainName;
        this.fromName = fromName;
        this.toName = toName;
        this.totalCapacity = totalCapacity;
        this.fromStationNumber = fromStationNumber;
        this.toStationNumber = toStationNumber;
    }

    async save(){
        let sql = `INSERT INTO Trains (trainNo , trainName , fromName , toName , totalCapacity ,  fromStationNumber , toStationNumber)
        VALUES(
            ${this.trainNo},
            '${this.trainName}',
            '${this.fromName}',
            '${this.toName}',
            ${this.totalCapacity},
            ${this.fromStationNumber},
            ${this.toStationNumber}
        );`

        const res = await db.execute(sql);
        return res;
    }


    static async getAllBetweenTwo(from , to){
        let sql = `SELECT *
        FROM Trains
        WHERE fromName = '${from}'
        AND toName = '${to}';`
        
        return db.execute(sql);
    }
    
    static async getalltrainStataions(){
        let sql = `SELECT fromName AS value
        FROM trains
        UNION
        SELECT toName
        FROM trains
        ORDER BY value;`

        return db.execute(sql);

    }

    static async getFromNumber(fromName){
        let sql = `SELECT DISTINCT fromStationNumber
        FROM trains WHERE
        fromName = "${fromName}";`

        return db.execute(sql);
    }
}

module.exports = Train;