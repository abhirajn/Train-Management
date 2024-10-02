const express = require('express');
const Train = require('../models/trainModel');
const Ticket = require('../models/ticketModal');
const jwt = require('jsonwebtoken');

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



router.post('/bookticket' , async(req,res,next)=>{
    // console.log(req.body)
    const {userId  , trainNo , trainName , fromName , toName  , fromStationNumber , 
      toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, 
      toDate ,fromTime , toTime,fare ,ticketStatus} = req.body;
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token is not valid' });
        }
      })
    const ticket = new Ticket(userId  , trainNo , trainName , fromName , toName  , fromStationNumber , 
      toStationNumber  , passengerNames , passengerAge , passengerGender , totalTickets, fromDate, 
      toDate ,fromTime , toTime,fare ,ticketStatus);
    await ticket.bookTicket();
    res.send("succesfully ticket p;purchased");

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