const express = require('express')
const app = express()

//env config
const dotenv = require('dotenv');
dotenv.config()

// const quoteRouter = require('./routes/quotes')
// Importing user router to deal with users
const userRouter = require('./routes/user')

//to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// app.use('/api/quotes',quoteRouter)
app.use('/api/users',userRouter)

app.listen(process.env.port || 3000, () => { console.log(`Server listening on port ${process.env.port || 3000}...`); })