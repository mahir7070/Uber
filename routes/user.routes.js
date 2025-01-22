import express from 'express';
import { Router } from 'express';
import { registeruser,loginuser,getuserprofile,logoutuser} from '../controller/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = Router();
router.route('/register').post(registeruser);
router.route('/login').post(loginuser);
router.route('/profile').get(auth,getuserprofile);
router.route('/logout').get(auth,logoutuser);


export default router;