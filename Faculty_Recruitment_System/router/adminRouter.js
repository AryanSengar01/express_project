import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import {adminLoginController} from '../controller/adminController.js'; 
import {adminViewRecruiterListController} from '../controller/adminViewRecruiterListController.js';
var adminRouter = express.Router();

dotenv.config();
const admin_secret_key = process.env.ADMIN_SECRET_KEY;

const authenticateJWT = (request,response,next)=>{
    var token = request.cookies.admin_jwt;

    if(!token)
    response.render("adminlogin");

    else
    {
    jwt.verify(token,admin_secret_key,(error,payload)=>{
        if(error)
            console.log("error occured in admin authenticate jwt");
        else{
            request.payload = payload;
            next();
        }
    });
}
}

adminRouter.use(express.static("public"));
adminRouter.get("/",authenticateJWT,(request,response)=>{
    response.render("adminhomepage",{email : request.payload._id});
});

adminRouter.get("/adminHomePage",authenticateJWT,(request,response)=>{
    response.render("adminhomepage",{email:request.payload._id});
});

adminRouter.post("/login",adminLoginController);
adminRouter.get("/adminViewRecruiterList",adminViewRecruiterListController);

export default adminRouter;