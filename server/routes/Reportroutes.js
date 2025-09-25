import express from 'express'
import userAuth from '../middleware/userAuth.js';
import {Postcreated,commentSend,upvoteReport,removeUpvote,downvoteReport,removeDownvote} from "../controller/Reportcontroller.js";
import upload from "../middleware/multer.js"

const Reportroutes = express.Router();
Reportroutes.post('/create-post',userAuth,upload.array("photos", 5),Postcreated);
Reportroutes.post('/comment-send',userAuth,commentSend);

Reportroutes.post("/report/:id/upvote", upvoteReport);
Reportroutes.post("/report/:id/remove-upvote", removeUpvote);


Reportroutes.post("/report/:id/downvote", downvoteReport);
Reportroutes.post("/report/:id/remove-downvote", removeDownvote);


export default Reportroutes;
    