const db = require("../config/db")


class Ticket{
    constructor(userId ,pnrNumber , trainNo , trainName , fromName , toName  , fromStationNumber , toStationNumber , trainDate , passengerNames , passengerAge , passengerGender , totalTickets){
        this.userId = userId;
        this.pnrNumber = pnrNumber;
        this.trainNo = trainNo;
        this.trainName = trainName;
        this.fromName = fromName;
        this.toName = toName;
        this.fromStationNumber = fromStationNumber;
        this.toStationNumber = toStationNumber;
        this.trainDate = trainDate;
        this.passengerNames = passengerNames;
        this.passengerAge = passengerAge;
        this.passengerGender = passengerGender;
        this.totalTickets = totalTickets;
    }

    async bookTicket(){
        let sql = `INSERT INTO Tickets (userId ,pnrNumber , trainNo , trainName , fromName , toName  , fromStationNumber , toStationNumber , trainDate , passengerNames , passengerAge , passengerGender , totalTickets)
        VALUES(
            '${this.userId}',
            ${this.pnrNumber},
            ${this.trainNo},
            '${this.trainName}',
            '${this.fromName}',
            '${this.toName}',
            ${this.fromStationNumber},
            ${this.toStationNumber},
            '${this.trainDate}',
            '${this.passengerNames}',
            '${this.passengerAge}',
            '${this.passengerGender}',
            ${this.totalTickets}
        );`

        const res = await db.execute(sql);
        return res;
    }


    static async get_No_BookedTickets(trainDate  , fromNumber , toNumber , trainNo){
        // console.log(trainDate , fromNumber ,  trainNo)
        let sql = `SELECT SUM(totalTickets) AS total_tickets 
        FROM Tickets
        WHERE trainDate = '${trainDate}'
        AND trainNo = ${trainNo}
        AND toStationNumber > ${fromNumber};`
        
        const res = await db.execute(sql);
        // console.log(typeof res[0])
        // console.log("res" , res[0][0].total_tickets);
        var t = 0;
        if(res[0][0].total_tickets){
            t = Number(res[0][0].total_tickets);
        }
        // console.log(res)
         
        return {value : t};
    }

   
}

module.exports = Ticket;