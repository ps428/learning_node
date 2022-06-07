const express = require('express')
const router = express.Router()

//Importing functionalities of the users from userController file
const user = require('./controllers/userController')

//Importing validators
const {createUserValidation, updateUserValidation, logInValidation, deleteValidation, changePasswordValidation} = require('../validators')

//Setting the requests 
router.post('/adduser',createUserValidation, user.addUser)
router.put('/updateuser',updateUserValidation, user.updateUser)
router.delete('/deleteuser',deleteValidation, user.deleteUser)
router.post('/changepassword',changePasswordValidation, user.changePassword)

//for testing
router.post('/login',user.getProfile)

module.exports = router;
