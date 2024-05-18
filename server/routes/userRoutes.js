const express = require('express');
const Train = require('../models/trainModel');
const Ticket = require('../models/ticketModal');

const router = express.Router();

router.post('/bookticket' , async(req,res,next)=>{
    // console.log(req.body)
    const {userId ,pnrNumber , trainNo , trainName , fromName , toName  , fromStationNumber , toStationNumber , trainDate , passengerNames , passengerAge , passengerGender , totalTickets} = req.body;

    const ticket = new Ticket(userId ,pnrNumber , trainNo , trainName , fromName , toName  , fromStationNumber , toStationNumber , trainDate , passengerNames , passengerAge , passengerGender , totalTickets);
    await ticket.bookTicket();
    res.send("succesfully ticket p;purchased");

})

router.post('/getavailableSeats' , async(req ,res ,next)=>{
    const {trainDate  , fromNumber , toNumber , trainNo} = req.body;
    // console.log(req.body)
    const resp = await Ticket.get_No_BookedTickets(trainDate  ,fromNumber, toNumber , trainNo)
    // console.log(resp);
    res.send(resp);
})


router.post('/getTrains' , async(req,res,next)=>{
    const {from , to} = req.body;
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



module.exports = router;