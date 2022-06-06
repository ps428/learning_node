const {check} = require('express-validator')

registerValidation = [
    check('name','Name is required').not().isEmpty(),
    check('password','Enter password of atleast 6 characters').isLength({min:6}),
    check('userid','Please enter a unique user id').not().isEmpty(),
    check('email','Please enter a valid email id').isEmail().normalizeEmail({gmail_remove_dots: true}),
    check('image_link','Please enter a link to your profile').isURL()
]

logInValidation = [
    check('userid','Please enter a unique user id').not().isEmpty(),
    check('password','Enter password of atleast 6 characters').isLength({min:6})    
]

module.exports = {registerValidation, logInValidation}