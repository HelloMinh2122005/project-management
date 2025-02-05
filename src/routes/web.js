const express = require('express')
const { getLandingPage, getSignUpPage, addNewUser, getSignInPage, signInUser, getWelcomePage, authenticationUser } = require('../controllers/home-controllers')
const { signUp } = require('../services/user.service')
const { addProject } = require('../services/project.service')
const { addTask } = require('../services/task.service')
const router = express.Router()

// init router
router.get('/', getLandingPage)
router.get('/signup', getSignUpPage)
router.get('/signin', getSignInPage)
router.get('/welcome/:id', authenticationUser, getWelcomePage)

// init function
router.post('/signupPOST', addNewUser)
router.post('/signinPOST', signInUser)

//test
router.use('/test_add_user', signUp)
router.use('/test_add_project', addProject)
router.use('/test_add_user_project', addTask)

module.exports = router