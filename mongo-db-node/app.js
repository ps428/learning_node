const express = require('express')
const app = express()
const quoteRouter = require('./routes/quotes')
const userRouter = require('./routes/user')

//to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


app.use('/api/quotes',quoteRouter)
app.use('/api/users',userRouter)


app.listen(3000, () => { console.log('Server listening on port 3000...'); })