const express = require('express')

const router = express.Router()

const {createChotaUrl} = require('../controllers/urlcontrollers')

router.post('/chotakro', createChotaUrl)

module.exports = router

