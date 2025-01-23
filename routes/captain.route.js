import express from 'express';
import  { Router } from'express';
import { registercaptain,logincaptain,getcaptainprofile,logoutcaptain } from '../controller/captain.controller.js';
import { capauth } from '../middleware/auth.middleware.js';


const router=Router();

router.route('/register').post(registercaptain);
router.route('/login').post(logincaptain);
router.route('/profile').get(capauth,getcaptainprofile);
router.route('/logout').get(logoutcaptain);




export default router;