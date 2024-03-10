import express from 'express';
import {adminLoginController} from '../controller/adminController.js'; 
var adminRouter = express.Router();

adminRouter.get("/",(request,response)=>{
    response.render("adminlogin");
});

adminRouter.post("/login",adminLoginController);

export default adminRouter;