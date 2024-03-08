import express from 'express';
import { registration } from '../controller/recruiterController.js';
var recruiterRouter = express.Router();

recruiterRouter.use(express.static('public'));
recruiterRouter.get("/recruiterlogin",(request,response)=>{
    response.render("recruiterlogin");
});
recruiterRouter.get("/recruiterregistration",(request,response)=>{
    response.render("recruiterregistration");
});
recruiterRouter.post("/registration",registration);


export default recruiterRouter;