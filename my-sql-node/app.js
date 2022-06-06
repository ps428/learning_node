const express = require('express')
const app = express()
const dotenv = require('dotenv');
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

//to config env file
dotenv.config()
//to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)

const {connection} = require('./dbConfigMysql')

app.listen(3000,()=>console.log("Server started on port 3000..."))