const express = require('express');
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors({
    origin: 'https://train-management-1.onrender.com' ,  // Replace with your frontend domain
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }));

app.use(cookieParser());

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/admin' , adminRoutes)
app.use('/api' , userRoutes)
app.use('/user' , authRoutes)
app.get('/' , (req,res)=>[
    res.send('hi')
])


app.listen(3000 , (req,res)=>{
    console.log('server started at port 3000');
})