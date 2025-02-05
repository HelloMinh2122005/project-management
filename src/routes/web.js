const express = require('express');
const router = express.Router();

// controllers
const {
    getLandingPage,
    getSignUpPage,
    addNewUser,
    getSignInPage,
    signInUser,
    getWelcomePage,
    logoutUser,
    authenticationUser
} = require('../controllers/home-controllers');


// services for testing
const { signUp, getUserByID, getUserByName } = require('../services/user.service');
const { addProject, getAllProjects } = require('../services/project.service');
const { addTask } = require('../services/task.service');

// ------------------ Public Routes ------------------ //
router.get('/', getLandingPage);
router.get('/signup', getSignUpPage);
router.get('/signin', getSignInPage);
router.post('/signupPOST', addNewUser);
router.post('/signinPOST', signInUser);
router.post('/logoutPOST', logoutUser);

// ------------------ Protected Routes ------------------ //
// router.use(authenticationUser);

router.get('/welcome/:id', getWelcomePage);

// ------------------ Test Routes ------------------ //
router.use('/test_add_user', signUp);
router.use('/test_add_project', addProject);
router.use('/test_add_user_project', addTask);
router.use('/test_get_user', getUserByID);
router.use('/test_get_user_by_name', getUserByName);
router.use('/test_get_all_projects', getAllProjects);

module.exports = router;
