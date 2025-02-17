import express from 'express';
const router = express.Router();
import checkTokenKey from '../../middlewares/auth/checkTokenKey.js';

import AccessController from '../../controllers/other/access.controller.js';
import AccessService from '../../services/other/access.service.js';

const accessService = new AccessService();
const accessController = new AccessController(accessService);

// this no need to be authenticated
router.post('/login', accessController.login.bind(accessController)); // checking
router.post('/signup', accessController.signup.bind(accessController)); // checking

// authenticate all routes below
router.use(checkTokenKey); // checking

export default router;