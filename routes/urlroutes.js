const express = require('express')

const router = express.Router()

const {createChotaUrl, redirectKaroChotaUrl} = require('../controllers/urlcontrollers')

router.post('/chota-kro', createChotaUrl)

router.post('/redirect-kro', redirectKaroChotaUrl)
module.exports = router