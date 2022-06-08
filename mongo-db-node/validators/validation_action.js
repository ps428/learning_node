const { validationResult } = require('express-validator')

const validateRequestAction = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(409).json({ success: false, errors: errors.array() })
    }

    next();
}

module.exports = validateRequestAction 

