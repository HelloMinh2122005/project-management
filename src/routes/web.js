const express = require('express')
const { getHomePage } = require('../controllers/home-controllers')
const router = express.Router()


router.get('/', getHomePage)

module.exports = router