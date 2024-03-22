import recruiterModel from "../model/recruiterModel.js";
import mailer from './mailer.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import vacancyModel from "../model/vacancyModel.js";

dotenv.config();
const recruiter_secret_key = process.env.ADMIN_SECRET_KEY;
export const registration = async (request,response)=>{
    try{
        var obj = request.body;
        var obj = {
            name:request.body.name,
            recruiter:request.body.recruiter,
            _id:request.body._id,
            password: await bcrypt.hash(request.body.password,10),
            contact:request.body.contact,
            address:request.body.address
        }
        mailer.mailer(request.body._id,async(info)=>{
            if(info){
                console.log("Mail sent from controller message");
                var res = await recruiterModel.create(obj);
                console.log(res);
                console.log("data inserted successfully : "+res);        
                response.render("recruiterlogin",{msg:"Mail sent successfully | Please Verify"});
            }
        },"Hello "+request.body._id+", This is verification mail please <a href='http://localhost:3000/recruiter/verifyemail?email="+request.body._id+"'>Click This Link</a> for verification");
    }catch(error){
        console.log("error occured");
    }
};

export const verifyEmail = async(request,response)=>{
    try{
        var email = request.query.email;
        var verifyEmailStatus = {
            $set : {
                emailverify : "Verified"
            }
        }
        var res = await recruiterModel.updateOne({_id:email},verifyEmailStatus);
        console.log("After verify : ",res);
        response.render("recruiterlogin",{msg:"Email Verified Successfully"});
    }catch(err){
        console.log("Error in emailVerify : "+err);
    }
}

export const login = async(request,response)=>{
    try{
        const {_id,password} = request.body;

        console.log("obj :",request.body);
        var expireTime = {
            expiresIn:"1d"
        }

        var token = jwt.sign({_id:_id},recruiter_secret_key,expireTime);

        if(!token)
        console.log("Error while generating token in recruiter login");

        else
        {
            response.cookie("recruiter_jwt",token,{maxAge:24*60*60*1000,httpOnly:true});

            var recruiterLogin = await recruiterModel.findOne({_id:request.body._id,emailverify:"Verified",adminverify:"Verified"});

            if(recruiterLogin!=null)
            {
                var status = bcrypt.compare(request.body.password,recruiterLogin.password);

                if(status)
                response.render("recruiterhomepage",{email:request.body._id});

                else
                response.render("recruiterlogin",{msg:"Error while comparing password"});
            }
            else
            {
                response.render("recruiterlogin",{msg:"you entered either wrong email or not verify by admin and you don't verify your email"});
            }
        }
    }
    catch(error)
    {
        console.log("Error in recruiter login :",error);
    }
}

export const logout = (request,response)=>{
    response.clearCookie("recruiter_jwt");

    response.render("recruiterlogin",{msg:"Logout Successfully"});
}

export const addVacancyForm = async(request,response)=>{
    try{
        var res = await vacancyModel.create(request.body);
        console.log("res :",res);

        response.render("recruiterhomepage",{email:request.payload._id});
    }
    catch(error)
    {
        console.log("Error in add vacancy catch :",error);
    }
}