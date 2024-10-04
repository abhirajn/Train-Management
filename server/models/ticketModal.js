// const { default: Registeruser } = require("../../client/src/components/RegisterUser");
const db = require("../config/db")


class Ticket{
    constructor(userId  , trainNo , trainName , fromName , toName  , fromStationNumber , 
        toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, 
        toDate ,fromTime , toTime,fare ,ticketStatus){
        this.userId = userId;
        this.trainNo = trainNo;
        this.trainName = trainName;
        this.fromName = fromName;
        this.toName = toName;
        this.fromStationNumber = fromStationNumber;
        this.toStationNumber = toStationNumber;
        this.passengerNames = passengerNames;
        this.passengerAge = passengerAge;
        this.passengerGender = passengerGender;
        this.totalTickets = totalTickets;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.fare = fare;
        this.ticketStatus = ticketStatus;
    }

    async checkSeatAvailability(connection) {
        // Query to check available seats
        const [rows] = await connection.execute(
          `SELECT availableSeats FROM Trains WHERE trainNo = ? FOR UPDATE`, [this.trainNo]
        );
        if (rows.length === 0) {
          throw new Error('Train not found.');
        }
        return rows[0].availableSeats;
      }
    
      async updateSeatAvailability(connection, seatsToBook) {
        // Update the seat availability in the database
        const [result] = await connection.execute(
          `UPDATE Trains SET availableSeats = availableSeats - ? WHERE trainNo = ?`, [seatsToBook, this.trainNo]
        );
        return result.affectedRows;
      }

    async bookTicket(){
        let sql = `INSERT INTO tickets (userId  , trainNo , trainName , fromName , toName  , fromStationNumber , toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, toDate ,fromTime , toTime,fare,ticketStatus)
        VALUES(
            '${this.userId}',
            ${this.trainNo},
            '${this.trainName}',
            '${this.fromName}',
            '${this.toName}',
            ${this.fromStationNumber},
            ${this.toStationNumber},
            '${this.passengerNames}',
            '${this.passengerAge}',
            '${this.passengerGender}',
            ${this.totalTickets},
            '${this.fromDate}',
            '${this.toDate}',
            '${this.fromTime}',
            '${this.toTime}',
            ${this.fare},
            '${this.ticketStatus}'
        );`

        const res = await db.execute(sql);
        return res;
    }


    static async get_No_BookedTickets(trainDate  , fromNumber , toNumber , trainNo){
        // console.log(trainNo)
        let dateParts = trainDate.split('-');

// Rearrange into "YYYY-MM-DD"
let formattedDateString = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;

// Create a Date object
let dateObject = new Date(formattedDateString);

// Use the toString method
let dateStringOutput = dateObject.toString().substring(0,15);

// console.log(dateStringOutput);

        let sql = `SELECT SUM(totalTickets) AS total_tickets 
        FROM tickets
        WHERE fromDate = '${dateStringOutput}'
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

    static async getAllTicketsOfaUser(username){
        let sql = `SELECT * FROM tickets WHERE userId = '${username}';`
        return db.execute(sql);
    }

    static async getAllInfoFromPNR(pnr){
        let sql = `SELECT * FROM tickets WHERE pnrNumber = ${pnr};`
        return db.execute(sql);
    }

    static async cancelTicket(pnr){
        let sql = `UPDATE tickets SET ticketStatus = "Canceled" WHERE pnrNumber = ${pnr};`
        return db.execute(sql);
    }
    static async getAllTicketsforSummary(trainNo , fromname, toname, date){
        console.log(date)
        let sql = `SELECT * FROM tickets WHERE 
            trainNo = ${trainNo}    
            AND fromName = '${fromname}'
            AND toName = '${toname}'
            AND fromDate = '${date}' order by (ticketStatus);`
            return db.execute(sql);
    }

   
   
}

module.exports = Ticket;