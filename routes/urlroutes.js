const express = require('express')

const router = express.Router()

const {createChotaUrl, redirectkarochotaurl} = require('../controllers/urlcontrollers')

router.post('/chotakro', createChotaUrl)
// router.post('/redirectkro', redirectkarochotaurl)
module.exports = router


