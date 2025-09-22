import express from 'express'
import { isAuthenticated,googleLogin, registered, resetPassword, sendRestOtp, sendVerifyOtp, verifyEmail } from '../controller/authcontroller.js'
import { login } from '../controller/authcontroller.js'
import { logout } from '../controller/authcontroller.js'
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();
authRouter.post('/registered',registered);
authRouter.post('/login',login);
router.post("/google-login", googleLogin);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);
authRouter.post('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendRestOtp);
authRouter.post('/rest-password',resetPassword);


export default authRouter;
    