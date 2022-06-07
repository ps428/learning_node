const express = require('express')
const router = express.Router()
const quote = require('./controllers/quotesController')

router.post('/addquote',quote.addQuote)
router.get('/getquotes',quote.getQuotes)
router.put('/updatewriter',quote.updateWriter)
router.delete('/deletequote',quote.deleteQuote)

module.exports = router;
