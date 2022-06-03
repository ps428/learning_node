const express = require('express')
const app = express()


app.get('/',(req,res)=>{
    res.send('Home')
})

//Get requests
const movies = require('./movies')

app.get('/api/movies',(req,res)=>{
    res.send("Movie data")
})


app.get('/api/movies/:year',(req,res)=>{
    const year = Number(req.params.year)
    const movie = movies.find((movieCheck)=>movieCheck.year==year)
    
    if(!movie){
        return res.status(404).send("Movie not found")
    }
    res.send(movie)
})


app.listen(3000,()=>{
    console.log("Server up on port 3000");
})
