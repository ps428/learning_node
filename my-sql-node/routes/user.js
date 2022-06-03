const express = require('express')
const router = express.Router();
const user = require('./controllers/user')

router.get('/',user.getAllUsers)
router.get('/:userid',user.getUser)
router.post('/addUser',user.addUser)

module.exports = router;