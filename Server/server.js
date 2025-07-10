const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')


//dotenv
dotenv.config()

//db connect
connectDB();


//rest object
const app = express()


//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use('/api/v1/auth',require('./routes/userRoutes'))
app.use('/api/v1/post',require('./routes/postRoutes'))

app.get('/',(req,res)=>{
    res.status(200).json({
       " success":true,
       " message":"welcome to full stack app anil"
    });
});


//PORT
const PORT =process.env.PORT || 8080


//listen 
app.listen(PORT,()=>{
    console.log(`server Running ${PORT}`.bgBlue.white)
})