// create routes for user login and signup
import { Router } from 'express';
import UserController from '../controllers/userController';
import { checkJwt } from '../middlewares/checkJWT';

const router = Router();

// login route
router.post('/login', UserController.login);

// signup route
router.post('/signup', UserController.signup);

// change password route
router.post('/change-password', [checkJwt], UserController.changePassword);

module.exports = router;
