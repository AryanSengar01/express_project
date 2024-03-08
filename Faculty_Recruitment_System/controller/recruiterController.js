import recruiterModel from "../model/recruiterModel.js";

export const registration = async (request,response)=>{
    try{
        var obj = request.body;
        var res = await recruiterModel.create(obj);
        console.log(res);
        console.log("data inserted successfully");
    }catch(error){
        console.log("error occured");

    }
};