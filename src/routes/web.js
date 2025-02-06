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
const { signUp, getUserByID, getUserByName, signIn, getAllUsers, deleteUserById, updateUserById } = require('../services/user.service');
const { addProject, getAllProjects } = require('../services/project.service');
const { addTask } = require('../services/task.service');

// ------------------ Public Routes ------------------ //

// pages routes
router.get('/', getLandingPage);
router.get('/signup', getSignUpPage);
router.get('/signin', getSignInPage);

// actions routes test code
// user 
router.post('/signupPOST_t', addNewUser);
router.post('/signinPOST_t', signInUser);
router.post('/logoutPOST_t', logoutUser);
// project 

// task 

// post 

// ------------------------------------ //
// export routes API 
// user
router.post('/signinPOST', signIn);
router.post('/signupPOST', signUp);

// router.use(authenticationUser);
router.get('/getUserByIdGET', getUserByID);
router.get('/getUserByNameGET', getUserByName);
router.get('/getAllUserGET', getAllUsers);
router.delete('/deleteUserByIdDELETE', deleteUserById);
router.put('/updateUserByIdPUT', updateUserById);

// project
router.post('/addProjectPOST', addProject);
router.get('/getProjectPOST', getAllProjects);

// task
router.post('/addTaskPOST', addTask);

// notification

// post 

// ------------------ Protected Routes ------------------ //

router.get('/welcome/:id', getWelcomePage);


module.exports = router;
