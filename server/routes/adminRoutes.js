const express = require('express');
const Train = require('../models/trainModel');

const router = express.Router();

router.post('/addtrain' , async(req,res,next)=>{
    // console.log("hi")/
    // console.log(req.body)
    const {trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare} = req.body;

    const train = new Train(trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare);
    await train.save();
    res.send("succesfully added");

})


router.post('/getTrainFromNumber', async(req,res)=>{
   const {trainNumber,fromStationNumber ,toStationNumber} = req.body;
   try {
    const resp = await Train.getTrainDetailsFromNumber(trainNumber,fromStationNumber ,toStationNumber);
    res.status(200).send(resp)
   } catch (error) {
    res.status(400).send("eror")
   }

})

router.post('/updateTrainInfo', async(req,res)=>{
    console.log(req.body)
    const {trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare} = req.body;
    try {
        const resp = await Train.updateTrainValues(trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare);
        res.status(200).send("updated")
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
    }
})


router.post('/updateAllTrainInfo', async(req,res)=>{
    console.log(req.body)
    const {trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare} = req.body;
    try {
        const resp = await Train.updateAllTrainValues(trainName , trainNumber , fromStation , toStation , fromStationNumber , toStationNumber , startTime  ,duration, status,totalCapacity,fare);
        res.status(200).send("updated")
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
    }
})






module.exports = router;