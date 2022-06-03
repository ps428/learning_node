const express = require('express')
const app = express()
const dotenv = require('dotenv');
const userRoutes = require('./routes/user')

//to config env file
dotenv.config()

app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.use('/users',userRoutes)

//to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


const {connection} = require('./dbConfigMysql')



app.listen(3000,()=>console.log("Server started on port 3000..."))