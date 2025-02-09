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


// services 
const { signUp, getUserByID, getUserByName, signIn, getAllUsers, deleteUserById, updateUserById } = require('../services/user.service');
const { addProject, getAllProjects, updateProject, deleteProject, getProjectById, getProjectByMember, getAllMembersByIdProject } = require('../services/project.service');
const { addTask, getMemberByTaskID, getAllTasks, updateTask, deleteTask, getTaskById, getProjectIdByTaskId } = require('../services/task.service');
const { createNotification, deleteNotification, getAllNotifications } = require('../services/notification.service');
const { createNotificationPost } = require('../services/helpers/notification-helper');
const { addPost, getAllPosts, getPostById, updatePost, deletePost, getPostByIdCreator, getPostByIdProject } = require('../services/post.service');
const { sendEmail, verifyCode } = require('../auth/reset-password');

// ------------------ Public Routes ------------------ //

// pages routes
router.get('/', getLandingPage);
router.get('/signup', getSignUpPage);
router.get('/signin', getSignInPage);

// // actions routes test code
// // user 
// router.post('/signupPOST_t', addNewUser);
// router.post('/signinPOST_t', signInUser);
// router.post('/logoutPOST_t', logoutUser);
// project 

// task 

// post 

// ------------------------------------ //++++++
// export routes API  
// user
router.post('/loginPOST', signIn); // done
router.post('/signupPOST', signUp); // done
router.post('/sendVerificationCodePOST', sendEmail); // done
router.post('/checkVerificationCodePOST', verifyCode); // done


// router.use(authenticationUser);
router.get('/getUserByIdGET', getUserByID); // done
router.get('/getUserByNameGET', getUserByName); // done
router.get('/getAllUserGET', getAllUsers); // done
router.delete('/deleteUserByIdDELETE', deleteUserById); // cascade not done
router.patch('/updateUserByIdPATCH', updateUserById); // done 

// project
router.post('/addProjectPOST', addProject); // done
router.patch('/updateProjectByIdPATCH', updateProject); // done
router.delete('/deleteProjectByIdDELETE', deleteProject); // half done
router.get('/getProjectPOST', getAllProjects); // done
router.get('/getMembersByIdProjectGET', getAllMembersByIdProject); // half done
router.get('/getProjectByIdGET', getProjectById); // done 
router.get('/getProjectByIdMemberGET', getProjectByMember);


// task 
router.post('/addTaskPOST', addTask);
router.patch('/updateTaskByIdPATCH', updateTask);
router.delete('/deleteTaskByIdDELETE', deleteTask);
router.get('/getAllTaskGET', getAllTasks);
router.get('/getTaskByIdGET', getTaskById);
router.get('/getProjectIdByTaskIdGET', getMemberByTaskID);
router.get('/getProjectIdByTaskIdGET', getProjectIdByTaskId);


// notification
router.post('/addNotificationPOST', createNotification); // done
router.post('/addNotificationPostPOST', createNotificationPost); // done
router.delete('/deleteNotificationByIdDELETE', deleteNotification);
router.get('/getNotificationGET', getAllNotifications);

// post 
router.post('/addPostPOST', addPost); // done
router.get('/getAllPostGET', getAllPosts);
router.get('/getPostByIdGET', getPostById);
router.patch('/updatePostByIdPATCH', updatePost);
router.delete('/deletePostByIdDELETE', deletePost);
router.get('/getPostByIdCreatorGET', getPostByIdCreator);
router.get('/getPostByIdProjectGET', getPostByIdProject);


// ------------------ Protected Routes ------------------ //

router.get('/welcome/:id', getWelcomePage);


module.exports = router;
