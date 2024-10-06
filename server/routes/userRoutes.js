const express = require('express');
const Train = require('../models/trainModel');
const Ticket = require('../models/ticketModal');
const jwt = require('jsonwebtoken');
const db = require("../config/db")
const router = express.Router();
const secretKey = "abhi"

router.post('/boookticket', async (req, res, next) => {
  const {
    userId,
    trainNo,
    trainName,
    fromName,
    toName,
    fromStationNumber,
    toStationNumber,
    passengerNames,
    passengerAge,
    passengerGender,
    totalTickets,
    fromDate,
    toDate,
    fromTime,
    toTime,
    fare,
    ticketStatus
  } = req.body;
  
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  });

  const ticket = new Ticket(
    userId,
    trainNo,
    trainName,
    fromName,
    toName,
    fromStationNumber,
    toStationNumber,
    passengerNames,
    passengerAge,
    passengerGender,
    totalTickets,
    fromDate,
    toDate,
    fromTime,
    toTime,
    fare,
    ticketStatus
  );

  // Start a database transaction
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Check seat availability with a lock
    const availableSeats = await ticket.checkSeatAvailability(connection);

    if (availableSeats < totalTickets) {
      throw new Error('Not enough seats available');
    }

    // Update seat availability
    const updated = await ticket.updateSeatAvailability(connection, totalTickets);

    if (!updated) {
      throw new Error('Failed to update seat availability');
    }

    // Book the ticket
    await ticket.bookTicket(connection);

    // Commit the transaction
    await connection.commit();

    res.send('Ticket successfully purchased');
  } catch (err) {
    // Rollback transaction on error
    await connection.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    connection.release();
  }
});

router.post('/asdftick', async (req,res)=>{
  
  const {userId  , trainNo , trainName , fromName , toName  , fromStationNumber , 
    toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, 
    toDate ,fromTime , toTime,fare ,ticketStatus} = req.body;
    let connection;
    try {
        // Step 1: Get a connection from the pool
        connection = await db.getConnection();

        // Step 2: Start the transaction
        await connection.beginTransaction();

        // Step 3: Get total booked tickets for the train
        const [bookedTicketsResult] = await connection.query(
            'SELECT SUM(totalTickets) AS totalBooked FROM tickets WHERE fromDate = ? AND toStationNumber > ? AND trainNo = ? FOR UPDATE',
            [fromDate, fromStationNumber, trainNo]
        );

        const totalBooked = bookedTicketsResult[0]?.totalBooked || 0;

        // Step 4: Get the total capacity of the train
        const [capacityResult] = await connection.query(
            'SELECT totalCapacity FROM trains WHERE trainNumber = ? FOR UPDATE',
            [trainNo]
        );

        const totalCapacity = capacityResult[0]?.totalCapacity;
        console.log(totalBooked , totalTickets , totalCapacity)
        // Step 5: Check if there are enough seats available
        if (Number(totalBooked) + Number(totalTickets) <= Number(totalCapacity)) {
            // Proceed with booking the ticket
            console.log("inside if")
            await connection.query(
              'INSERT INTO tickets (userId  , trainNo , trainName , fromName , toName  , fromStationNumber , toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, toDate ,fromTime , toTime,fare,ticketStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
              [userId  , trainNo , trainName , fromName , toName  , fromStationNumber , toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, toDate ,fromTime , toTime,fare,ticketStatus]
          );
            // INSERT INTO tickets (userId  , trainNo , trainName , fromName , toName  , fromStationNumber , toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, toDate ,fromTime , toTime,fare,ticketStatus)
            // VALUES(
            //     '${this.userId}',
            //     ${this.trainNo},
            //     '${this.trainName}',
            //     '${this.fromName}',
            //     '${this.toName}',
            //     ${this.fromStationNumber},
            //     ${this.toStationNumber},
            //     '${this.passengerNames}',
            //     '${this.passengerAge}',
            //     '${this.passengerGender}',
            //     ${this.totalTickets},
            //     '${this.fromDate}',
            //     '${this.toDate}',
            //     '${this.fromTime}',
            //     '${this.toTime}',
            //     ${this.fare},
            //     '${this.ticketStatus}'
            // );`
            // const { passengerNames, passengerAge, passengerGender } = passengerDetails;
          //  console.log("bboked" + req.body);

            // Step 6: Commit the transaction
            await connection.commit();
            res.send("Ticket successfully purchased");
        } else {
            // Step 7: Rollback if no seats available
            console.log("else")
            await connection.rollback();
            res.status(401).json({ message: 'No seats available' });
        }
    } catch (error) {
        // Step 8: Handle errors and rollback if anything goes wrong
        console.log("error")
        if (connection) await connection.rollback();
        console.error('Transaction failed:', error);
        res.status(500).json({ message: 'Booking failed, please try again later.' });
    } finally {
        // Step 9: Release the connection back to the pool
        console.log("finally")
        if (connection) connection.release();
    }


})
router.post('/bookticket' , async(req,res,next)=>{
    // console.log(req.body)
    let connection;
   
    const {userId  , trainNo , trainName , fromName , toName  , fromStationNumber , 
      toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, 
      toDate ,fromTime , toTime,fare ,ticketStatus} = req.body;
    const token = req.cookies.token;
    // console.log(req.body)
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token is not valid' });
        }
      })
     
    try {
      connection = await db.getConnection();

      // Step 2: Start the transaction
      await connection.beginTransaction();
      var temp = await Ticket.get_total_booked_tickets(fromDate  , fromStationNumber , trainNo).then(async(result)=>{
        // console.log("result", result);
        var newtemp = await Ticket.get_total_capacity_of_the_train(trainNo).then(async(capa)=>{
          // console.log("capa" , Number(result)+totalTickets)
          // console.log("capa2" , Number(capa))
          if(Number(result)+totalTickets <= Number(capa)){
            const ticket = new Ticket(userId  , trainNo , trainName , fromName , toName  , fromStationNumber , 
              toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, 
              toDate ,fromTime , toTime,fare ,ticketStatus);
            await ticket.bookTicket();
            await connection.commit();
            res.send("succesfully ticket p;purchased");
          }else{
            await connection.rollback();
            return res.status(401).json({ message: 'No seats available' }); 
          }
        })
      })
    } catch (error) {
      if (connection) await connection.rollback();
      console.error('Transaction failed:', error);
      res.status(500).json({ message: 'Booking failed, please try again later.' });
    }finally{
      if (connection) connection.release();
    }
   
      
})

router.post('/getavailableSeats' , async(req ,res ,next)=>{
// console.log('hhi')
    const {trainDate  , fromNumber , toNumber , trainNo} = req.body;
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token is not valid' });
        }
      })
    // console.log(req.body)
    const resp = await Ticket.get_No_BookedTickets(trainDate  ,fromNumber, toNumber , trainNo)
    // console.log(resp);
    res.send(resp);
})


router.post('/getTrains' , async(req,res,next)=>{
    const {from , to} = req.body;
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token is not valid' });
        }
      })
    // console.log(req.body)
    const resp = await Train.getAllBetweenTwo(from , to);
    res.send(resp[0])
})


router.get('/getallTrains' , async(req,res,next)=>{
    const resp  = await Train.getalltrainStataions();
    res.send(resp[0]);
})


router.post('/getfromNUmber' , async(req,res,next)=>{
    const {fromName} = req.body;
    const resp  =await Train.getFromNumber(fromName);
    // console.log(resp[0][0].fromStationNumber)
    res.send(resp[0][0])
})

router.get('/getAllTicketsOfaUser' , async(req,res,next)=>{
  const token = req.cookies.token;
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      jwt.verify(token, secretKey, async(err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token is not valid' });
        }else{
           const resp = await Ticket.getAllTicketsOfaUser(decoded.userId).then((response)=>{
              // console.log(response[0])
              return res.status(200).json(response[0]);  
           }).catch(()=>{
            return res.status(401).json({ message: 'Some error occured' });
           })
        }
      })
})



router.post('/getInfoFromPNR' ,async(req,res)=>{
  const {pnr} = req.body;
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  jwt.verify(token, secretKey, async(err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }else{
       const resp = await Ticket.getAllInfoFromPNR(pnr).then((response)=>{
          // console.log(response[0])
          return res.status(200).json(response[0]);  
       }).catch(()=>{
        return res.status(401).json({ message: 'Some error occured' });
       })
    }
  })
})


router.post('/cancelTicket' , async(req,res)=>{
  const {pnr} = req.body;
  const resp = await Ticket.cancelTicket(pnr).then((response)=>{
    // console.log(response[0])
    return res.status(200).json("done");  
 }).catch(()=>{
  return res.status(401).json({ message: 'Some error occured' });
 })
})


module.exports = router;