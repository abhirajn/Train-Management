const db = require("../config/db")


class Train{
    constructor(trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare){
        this.trainName = trainName;
        this.trainNumber = trainNumber;
        this.fromStation = fromStation;
        this.toStation = toStation;
        this.fromStationNumber = fromStationNumber;
        this.toStationNumber = toStationNumber;
        this.startTime = startTime;
        this.duration = duration;
        this.status = status;
        this.totalCapacity = totalCapacity;
        this.fare = fare;
    }
    


    async save(){
        let sql = `INSERT INTO Trains (trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare)
        VALUES(
        '${this.trainName}',
        ${this.trainNumber},
        '${this.fromStation}',
        '${this.toStation}',
        ${this.fromStationNumber},
        ${this.toStationNumber},
        '${this.startTime}',
        '${this.duration}',
        '${this.status}',
        ${this.totalCapacity},
        ${this.fare}
        );`

        const res = await db.execute(sql);
        return res;
    }


    static async getAllBetweenTwo(from , to){
        let sql = `SELECT *
        FROM Trains
        WHERE fromStation = '${from}'
        AND toStation = '${to}' 
        AND status = 'Running';`
        
        return db.execute(sql);
    }
    
    static async getalltrainStataions(){
        let sql = `SELECT fromStation AS value
        FROM trains
        UNION
        SELECT toStation
        FROM trains
        ORDER BY value;`

        return db.execute(sql);

    }

    static async getFromNumber(fromName){
        let sql = `SELECT DISTINCT fromStationNumber
        FROM trains WHERE
        fromStation = "${fromName}";`

        return db.execute(sql);
    }

    static async getTrainDetailsFromNumber(tno,fromStationNumber ,toStationNumber){
        let sql= `SELECT * FROM Trains WHERE trainNumber = ${tno} AND fromStationNumber = ${fromStationNumber} AND toStationNumber = ${toStationNumber}`
        return db.execute(sql);
    }


    static async updateTrainValues(trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare){
       console.log(trainNumber , typeof trainNumber)
        let sql = `UPDATE Trains
        SET trainName = '${trainName}',
        fromStation = '${fromStation}',
        toStation = '${toStation}',
        fromStationNumber = ${fromStationNumber},
        toStationNumber = ${toStationNumber},
        startTime = '${startTime}', 
        duration = '${duration}',
        status = '${status}',
        totalCapacity = ${totalCapacity},
        fare = ${fare}
        WHERE trainNumber = ${trainNumber} AND fromStationNumber = ${fromStationNumber} AND toStationNumber = ${toStationNumber};`
        return db.execute(sql);
    }
    
    static async updateAllTrainValues(trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare){
        console.log(trainNumber , typeof trainNumber)
         let sql = `UPDATE Trains
         SET trainName = '${trainName}',
         fromStation = '${fromStation}',
         toStation = '${toStation}',
         fromStationNumber = ${fromStationNumber},
         toStationNumber = ${toStationNumber},
         startTime = '${startTime}', 
         duration = '${duration}',
         status = '${status}',
         totalCapacity = ${totalCapacity},
         fare = ${fare}
         WHERE trainNumber = ${trainNumber};`
         return db.execute(sql);
     }
}

module.exports = Train;