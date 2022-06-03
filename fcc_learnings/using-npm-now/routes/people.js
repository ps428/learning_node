const express = require('express')
const router = express.Router()


///using elegant controllers
const { getPeople,
    postPeople,
    postPeoplePostman,
    updatePeople,
    deletePeople } = require('../controllers/people')

//****TO GET ACCESS TO REQ>BODY */
const app = express()
app.use(express.urlencoded({ extended: false }))


//*******HERE REPLACE ALL THE /api/people with / only */

router.get('/', getPeople)

router.post('/', postPeople)

router.post('/postman', postPeoplePostman)

// Put request
router.put('/:id', updatePeople)

//delete request
router.delete('/:id', deletePeople)

module.exports = router