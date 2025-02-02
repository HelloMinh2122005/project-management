const express = require('express')
const { getHomePage } = require('../controllers/home-controllers')
const { signUp } = require('../services/user.service')
const { addProject } = require('../services/project.service')
const { addTask } = require('../services/task.service')
const router = express.Router()

// init router
router.get('/', getHomePage)

// init function
router.use('/test_add_user', signUp)
router.use('/test_add_project', addProject)
router.use('/test_add_user_project', addTask)

module.exports = router