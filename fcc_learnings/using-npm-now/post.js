const express = require('express')
const app = express()

const {people} = require('./data')



//setting form html css js to get user input
app.use(express.static('./methods-public'))

//parse form data
// extended false => use query string library => if it is false, then req.body gives some output
// extended true => use qs library => if it if false, then req.body gives no output
app.use(express.urlencoded({extended: false}))

//parse json
app.use(express.json())

app.get('/api/people',(req,res)=>{
    res.status(200).json({success:true, data: people})
})

app.post('/api/people',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'Pleasse provide a valild name'})
    }

    res.status(201).send({success:true,msg:`User created. ${name} is created`,person:name})
})

app.post('/login',(req,res)=>{
    // console.log(req.body)
    //here for the json key value pair, name is the value and in the variable name, we have stored the key
    const {name} = req.body
    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send(`Please provide credentials`)
})

app.listen(3000,()=>{
    console.log("Server up on port 3000");
})
