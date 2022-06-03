const express = require('express')
const app = express()

const { people } = require('./data')



//setting form html css js to get user input
app.use(express.static('./methods-public'))

//parse form data
// extended false => use query string library => if it is false, then req.body gives some output
// extended true => use qs library => if it if false, then req.body gives no output
app.use(express.urlencoded({ extended: false }))

//parse json
app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Pleasse provide a valild name' })
    }

    res.status(201).send({ success: true, msg: `User created. ${name} is created`, person: name })
})

app.post('/api/people/postman', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Pleasse provide a valild name' })
    }

    res.status(201).send({ success: true, msg: `User created. ${name} is created`, person: name, data: [...people, name] })
})



app.post('/login', (req, res) => {
    // console.log(req.body)
    //here for the json key value pair, name is the value and in the variable name, we have stored the key
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send(`Please provide credentials`)
})

// Put request
app.put('/api/people/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const person = people.find((person) =>
        person.id == Number(id)
    )

    if (!person) {
        return res.status(400).json({ success: false, msg: `No person with id ${id}` })
    }

    const newPeople = people.map((person) => {
        if (person.id == Number(id)) {
            person.name = name
        }
        return person
    })

    res.status(200).json({ success: true, data: newPeople })
})

//delete request
app.delete('/api/people/:id', (req, res) => {
    const person = people.find((person) =>
        person.id == Number(req.params.id)
    )

    if (!person) {
        return res.status(400).json({ success: false, msg: `No person with id ${req.params.id}` })
    }
    const newPeople = people.filter((person)=>person.id!=Number(req.params.id))
    res.status(200).json({ success: true, data: newPeople })


})

app.listen(3000, () => {
    console.log("Server up on port 3000");
})
