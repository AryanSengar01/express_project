import recruiterModel from "../model/recruiterModel.js";
import mailer from './mailer.js';
import bcrypt from 'bcrypt';

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
        });
    }catch(error){
        console.log("error occured");
    }
};

export const verifyEmail = async(request,response)=>{
    try{
        var email = request.params.email;
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