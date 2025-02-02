const express = require('express')
const { getHomePage } = require('../controllers/home-controllers')
const { signUp } = require('../services/user.service')
const router = express.Router()

// init router
router.get('/', getHomePage)

// init function
router.use('/test', signUp)

module.exports = router