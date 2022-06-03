const express = require('express')
const app = express()   


// req => middleware => res


// Step 2 now exporting it to another file
const logger = require('./logger')


//Step 3 using logger in all the get requests
// app.use(logger)

//Step 3.2 for all the links starting with /api
app.use('/api',logger)

//step 4: Multiple middlewares
const authorize = require('./authorize')
app.use('/about',authorize)

/// step 4.2: multiple middlewares as
// app.use([logger,authorize])

// const logger = (req,res,next) => {
//     // Step 1
//     const method = req.method
//     const url = req.url
//     const time = new Date().getFullYear()
//     console.log(method,url,time)

//     // Step 1.2

//     //***else there would be a loading screen only, this is to pass on the control to the next middleware */
//     next()
// }

app.get('/',(req,res)=>{

    // Step 0.2
    // //suppose i want to do this thing again and agina, these console.logs, then i can make a function and use it as middleware
    // // for this, i will add that in the middle of '/' and (req,res)!!!!!!

    // Step 0
    // const method = req.method
    // const url = req.url
    // const time = new Date().getFullYear()
    
    // console.log(method)
    // console.log(url)
    // console.log(time)

    res.send('Home')
})

app.get('/about',(req,res)=>{
    res.send('About')
})



app.listen(3000,()=>{
    console.log("Server up on port 3000");
})
