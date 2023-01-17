import express from "express";
import * as authController from '../controllers/auth';

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignUp);
router.post('/logout', authController.postLogout);


export {router as authRouter}
