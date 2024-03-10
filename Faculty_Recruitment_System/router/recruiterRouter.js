import express from 'express';
import { registration,verifyEmail } from '../controller/recruiterController.js';
var recruiterRouter = express.Router();

recruiterRouter.use(express.static('public'));
recruiterRouter.get("/recruiterlogin",(request,response)=>{
    response.render("recruiterlogin",{msg:""});
});
recruiterRouter.get("/recruiterregistration",(request,response)=>{
    response.render("recruiterregistration");
});
recruiterRouter.post("/registration",registration);
recruiterRouter.get("/verifyemail",verifyEmail);


export default recruiterRouter;