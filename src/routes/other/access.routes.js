const express = require('express');
const router = express.Router();
const checkTokenKey = require('../../middlewares/auth/checkTokenKey');

const AccessController = require('../../controllers/other/access.controller');
const AccessService = require('../../services/other/access.service');

const accessService = new AccessService();
const accessController = new AccessController(accessService);

// this no need to be authenticated
router.post('/login', accessController.login.bind(accessController));
router.post('/signup', accessController.signup.bind(accessController));

// authenticate all routes below
router.use(checkTokenKey);


module.exports = router;