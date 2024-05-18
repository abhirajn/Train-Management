const express = require('express');
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const app = express();


app.use(express.json());
app.use(cors());

app.use('/admin' , adminRoutes)
app.use('/api' , userRoutes)
app.get('/' , (req,res)=>[
    res.send('hi')
])


app.listen(3000 , (req,res)=>{
    console.log('server started at port 3000');
})