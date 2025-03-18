const express = require('express')

const router = express.Router()

const {createChotaUrl, getUserUrlsList, deleteUrl} = require('../controllers/urlcontrollers')
const authenticateUser = require('../middleware/authmiddleware'); 

router.post('/chotakro', authenticateUser, createChotaUrl)

router.post('/getUrlsList', authenticateUser, getUserUrlsList)

router.post('/deleteUrl', authenticateUser, deleteUrl)

module.exports = router

