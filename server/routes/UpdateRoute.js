import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { UpdateProfile } from '../controller/UpdateProfile.js';
import upload from "../middleware/multer.js"
const UpdateRoute = express.Router();

UpdateRoute.post("/update-profile",userAuth,upload.array("photos", 5),UpdateProfile);
export default UpdateRoute;