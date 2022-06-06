const express = require('express')
const router = express.Router();
const auth = require('./controllers/authController')
const {registerValidation,logInValidation} = require('../validators')

router.get('/',auth.getAuthPages)

router.get('/login',auth.getLogInPage)
router.post('/login',logInValidation, auth.logInUser)

router.get('/register',auth.getRegisterPage)
router.post('/register',registerValidation, auth.registerUser)

module.exports = router;
