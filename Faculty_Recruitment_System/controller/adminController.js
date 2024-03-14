import recruiterModel from "../model/recruiterModel.js";
import adminModel from "../model/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const admin_secret_key = process.env.ADMIN_SECRET_KEY;

export const adminLoginController = async (request,response)=>{
    var obj = request.body;
    try{
        var expireTime = {
            expiresIn:'1d'
        }
        var token = jwt.sign({_id:request.body._id},admin_secret_key,expireTime);
    
    if(!token)
        response.render("index",{msg:"Error while setting up the token"});
    else{
        response.cookie("admin_jwt",token,{maxAge:24*60*60*1000,httpOnly:true});
       var adminEmail =  await adminModel.findOne({_id:request.body._id});
       //console.log("adminEmail : "+adminEmail); 
        if(adminEmail!=null){
            var adminPassword = await adminModel.findOne({_id:request.body._id},{password:1,_id:0});
            var status = bcrypt.compare(adminPassword.password,obj.password);            
            if(status)
                {
                    response.render("adminhomepage",{email:request.body._id});
                }
            else
                console.log("Error while admin Login");
        }
        else
        console.log("invalid email");
    }
    }catch(error){
        console.log("Error in admin login controller : ",error);
    }
}

export const adminViewRecruiterListController = async(request,response)=>{
    try{
        var res = await recruiterModel.findAll();

        response.render("adminviewrecruiterlist",{obj:res});
    }
    catch(error)
    {
        console.log("Error :",error);
    }
}