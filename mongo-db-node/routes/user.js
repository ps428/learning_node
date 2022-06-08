const express = require('express')
const router = express.Router()

//Importing functionalities of the users from userController file
const user = require('./controllers/userController')

//Importing validators
const validator = require('../validators/validation_schema')
const validatorAction = require('../validators/validation_action')

//Setting the requests 
router.post('/createuser', validator.createUserValidation, validatorAction, user.createUser)
router.put('/updateuser', validator.updateUserValidation, validatorAction, user.updateUser)
router.delete('/deleteuser', validator.deleteValidation, validatorAction, user.deleteUser)
router.put('/changepassword', validator.changePasswordValidation, validatorAction, user.changePassword)

//for testing
router.post('/login', validator.logInValidation, validatorAction, user.logIn)

module.exports = router;
