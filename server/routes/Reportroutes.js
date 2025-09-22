import express from 'express'
import userAuth from '../middleware/userAuth.js';
import {Postcreated,commentSend} from "../controller/Reportcontroller.js";
import upload from "../middleware/multer.js"

const Reportroutes = express.Router();
Reportroutes.post('/create-post',userAuth,upload.array("photos", 5),Postcreated);
Reportroutes.post('/comment-send',userAuth,commentSend);

export default Reportroutes;
    