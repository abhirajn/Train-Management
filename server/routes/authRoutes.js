const express = require('express');
const Train = require('../models/trainModel');
const Ticket = require('../models/ticketModal');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/userModal');
// const { route } = require('./userRoutes');

const router = express.Router();
// router.use(cookieParser());
const secretKey = "abhi"




router.post('/register', async (req, res, next) => {
  try {
      // Authenticate user (replace with your authentication logic)
      const { username, name, phone, password } = req.body;
      const user = { email: username }; // Example user object after authentication
// console.log(req.body)
      // Check if the user already exists
      const check = await User.checkIfUserExist(username);
      if (check[0].length > 0) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Save user in database
      const newuser = new User(username, name, phone, password);
      await newuser.save();
// 
      // Generate JWT
      const token = jwt.sign({ userId: user.email }, secretKey);
// console.log("hi")
      // Set JWT as an HTTP-only cookie
      res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
          sameSite: 'Strict', // Adjust according to your needs (Strict, Lax, None)
      });

      res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/login', async (req, res, next) => {
  try {
      // Authenticate user (replace with your authentication logic)
      const { username,  password } = req.body;
      const user = { email: username }; // Example user object after authentication

      // Check if the user already exists
      const check = await User.checkIfUserExist(username);
      if (check[0].length <= 0) {
          return res.status(400).json({ message: 'User doesnt exists' });
      }

      const newcheck = await User.checkEmailMathches(username);
      if(newcheck[0][0].password == password){
        const token = jwt.sign({ userId: user.email }, secretKey);
        // console.log("hi")
              // Set JWT as an HTTP-only cookie
              res.cookie('token', token, {
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


router.get('/checklogged' , async(req, res)=>{
console.log("hi")
console.log("hi1")
  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    // console.log("hi2")
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    // console.log("hi3")
    if (err) {
      // console.log("hi4")
      return res.status(401).json({ message: 'Token is not valid' });
    }else{
      // console.log("hi5")
      return res.status(200).json({id : decoded.userId});
    }
    
})
})

router.get('/logout',async (req, res) => {
  console.log("hi");
  res.clearCookie('token');
  // res.clearCookie('token', {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: 'Strict',
    // path: '/', // Specify the same path
  // });
  res.status(200).send("successfully cleared cookie")
});

router.get('/getEmailandPhone' , async(req,res)=>{
  const token = req.cookies.token;
// console.log(token)
if (!token) {
  // console.log("hi2")
  return res.status(401).json({ message: 'No token, authorization denied' });
}
  jwt.verify(token, secretKey, async(err, decoded) => {
    // console.log(decoded)
    if (err) {
      // console.log("hi4")
      return res.status(401).json({ message: 'Token is not valid' });
    }else{
      // console.log("hi5")/
      const resp = await User.getPhonebyEmail(decoded.userId).then((response)=>{
        // console.log("response",response[0][0].phone)
        return res.status(200).json({"id" : decoded.userId , "phone" : response[0][0].phone});
      }).catch(()=>{
        return res.status(401).json({ message: 'Phone number not found' });
      })
      
    }
    
})
})
 
module.exports = router;