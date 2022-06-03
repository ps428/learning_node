const { people } = require('../data')

const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people })
}

const postPeople =  (req, res) => {
    console.log(req)
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Pleasse provide a valild name' })
    }

    res.status(201).send({ success: true, msg: `User created. ${name} is created`, person: name })
}

const postPeoplePostman = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Pleasse provide a valild name' })
    }

    res.status(201).send({ success: true, msg: `User created. ${name} is created`, person: name, data: [...people, name] })
}

const updatePeople =  (req, res) => {
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
}

const deletePeople =  (req, res) => {
    const person = people.find((person) =>
        person.id == Number(req.params.id)
    )

    if (!person) {
        return res.status(400).json({ success: false, msg: `No person with id ${req.params.id}` })
    }
    const newPeople = people.filter((person)=>person.id!=Number(req.params.id))
    res.status(200).json({ success: true, data: newPeople })
}

module.exports = {
    getPeople,
    postPeople,
    postPeoplePostman,
    updatePeople,
    deletePeople
}