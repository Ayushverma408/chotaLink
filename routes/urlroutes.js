const express = require('express')

const router = express.Router()

const {createChotaUrl, redirectKaroChotaUrl} = require('../controllers/urlcontrollers')

router.post('/chotakro', createChotaUrl)
router.post('/redirectkro', redirectKaroChotaUrl)
module.exports = router


