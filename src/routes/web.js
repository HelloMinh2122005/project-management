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
const { addTask, getMemberByTaskID } = require('../services/task.service');
const { createNotification } = require('../services/notification.service');
const { createNotificationPost } = require('../services/helpers/notification-helper');
const { getAllMembersByIdProject } = require('../services/helpers/project-helper');
const { addPost, getAllPosts } = require('../services/post.service');

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
router.get('/getMembersByIdProjectGET', getAllMembersByIdProject);


// task
router.post('/addTaskPOST', addTask);
router.get('/getMemberByIdTaskGET', getMemberByTaskID);

// notification
router.post('/addNotificationPOST', createNotification);
router.post('/addNotificationPostPOST', createNotificationPost);


// post 
router.post('/addPostPOST', addPost);
router.get('/getAllPostGET', getAllPosts);


// ------------------ Protected Routes ------------------ //

router.get('/welcome/:id', getWelcomePage);


module.exports = router;
