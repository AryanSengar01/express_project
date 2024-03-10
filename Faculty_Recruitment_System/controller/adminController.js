import adminModel from "../model/adminModel.js";
import bcrypt from 'bcrypt';

export const adminLoginController = async (request,response)=>{
    var obj = request.body;
    try{
       var adminEmail =  await adminModel.findOne({_id:request.body._id});
       //console.log("adminEmail : "+adminEmail); 
        if(adminEmail!=null){
            var adminPassword = await adminModel.findOne({_id:request.body._id},{password:1,_id:0});
            var status = bcrypt.compare(adminPassword.password,obj.password);            
            if(status)
                console.log("Login successfully");
            else
                console.log("Error while admin Login");
        }
        else
        console.log("invalid email");
    }catch(error){
        console.log("Error in admin login controller : ",error);
    }
}