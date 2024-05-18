const express = require('express');
const Train = require('../models/trainModel');

const router = express.Router();

router.post('/addtrain' , async(req,res,next)=>{
    console.log(req.body)
    const {trainNo , trainName , fromName , toName , totalCapacity ,  fromStationNumber , toStationNumber} = req.body;

    const train = new Train(trainNo , trainName , fromName , toName , totalCapacity ,  fromStationNumber , toStationNumber);
    await train.save();
    res.send("succesfully added");

})






module.exports = router;