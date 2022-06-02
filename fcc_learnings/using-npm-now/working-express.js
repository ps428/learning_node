const express = require('express')
const app = express()

// 1 basic way

// app.get('/',(req,res)=>{
//     console.log("On Home");
//     res.send("Home Page")
// })


// app.get('/about',(req,res)=>{
//     console.log("On About");
//     res.status(200).send("About Page")
// })

// //we can also add a default value for non existing urls, but it is not mandatory, express knows how to deal with 404 kind of pages
// app.all("*",(req,res)=>{
//     res.status(404).send("<h1>Error 404! Not found anything here.</h1>")
// })


// app.listen(3000,()=>{
//     console.log("Server up on port 3000");
// })

///------------

// 2 elegant way
const path = require('path')

//see this works by default only on the '/' page
app.use(express.static('./public'))

app.get('/solar',(req,res)=>{
    res.end('solar')
})

app.all("*",(req,res)=>{
    res.status(404).send("<h1>Error 404! Not found anything here.</h1>")
})


app.listen(3000,()=>{
    console.log("Server up on port 3000");
})

//a more quick way to send all the html, css and js from one