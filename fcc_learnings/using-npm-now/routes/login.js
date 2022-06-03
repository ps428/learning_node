const express = require('express')
const router = express.Router()

//****TO GET ACCESS TO REQ>BODY */
const app = express()
app.use(express.urlencoded({ extended: false }))

router.post('/', (req, res) => {
    // console.log(req.body)
    //here for the json key value pair, name is the value and in the variable name, we have stored the key
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send(`Please provide credentials`)
})

module.exports = router