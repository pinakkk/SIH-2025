import express from 'express'
import { UserData,AllReport,Allhotspot,AlluserAlert } from '../controller/UserController.js';
import userAuth from '../middleware/userAuth.js';
const userRoute = express.Router();

userRoute.get('/user-data',userAuth,UserData);
userRoute.get("/all-Reports",AllReport)
userRoute.get("/all-hotspot",Allhotspot)
userRoute.get("/all-users-alert",userAuth,AlluserAlert)
export default userRoute;