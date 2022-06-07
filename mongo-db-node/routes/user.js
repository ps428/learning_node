const express = require('express')
const router = express.Router()
const user = require('./controllers/userController')

router.post('/adduser',user.addUser)
router.get('/getprofile/:username',user.getProfile)
router.put('/updateuser',user.updateUser)
router.delete('/deleteuser',user.deleteUser)

module.exports = router;
