import express from 'express';
import  { Router } from'express';
import { registercaptain,logincaptain } from '../controller/captain.controller.js';


const router=Router();

router.route('/register').post(registercaptain);
router.route('/login').post(logincaptain);



export default router;