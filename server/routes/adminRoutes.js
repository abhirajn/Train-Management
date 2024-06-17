const express = require('express');
const Train = require('../models/trainModel');
const Admin = require('../models/adminModal');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();
let secretKey = 'abhi'
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

router.post('/adminlogin', async (req, res, next) => {
    
    try {
        // Authenticate user (replace with your authentication logic)
        const { username,  password } = req.body;
        const user = { email: username }; // Example user object after authentication
  
        // Check if the user already exists
        const check = await Admin.checkIfUserExist(username);
        

        if (check[0].length <= 0) {
            return res.status(400).json({ message: 'User doesnt exists' });
        }
        
        const newcheck = await Admin.checkEmailMathches(username);
        console.log(newcheck)
        if(newcheck[0][0].adminPass == password){
          const token = jwt.sign({ userId: user.email }, secretKey);
          // console.log("hi")
                // Set JWT as an HTTP-only cookie
                res.cookie('Admintoken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
                    sameSite: 'Strict', // Adjust according to your needs (Strict, Lax, None)
                });
        }else{
          return res.status(400).json({ message: 'Wrong password' });
        }
  
        res.status(200).json({ message: 'User Login successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });


router.get('/getAllTrainInfo' , async(req,res)=>{
    const resp = await Train.getAllTrainInfo().then((r)=>{
        return res.status(200).json(r[0])
    }).catch(()=>{
        return res.status(400).json("TEchnical error")
    })
    
})  


module.exports = router;