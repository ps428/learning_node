const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))

//parse json
app.use(express.json())

//external routing
const peopleRouter = require('./routes/people')
const loginRouter = require('./routes/login')

app.use('/api/people',peopleRouter)
app.use('/login',loginRouter)

//setting form html css js to get user input
app.use(express.static('./methods-public'))


//parse form data
// extended false => use query string library => if it is false, then req.body gives some output
// extended true => use qs library => if it if false, then req.body gives no output


app.listen(3000, () => {
    console.log("Server up on port 3000");
})
