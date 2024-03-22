import nodemailer from 'nodemailer';
const mailer = function(email,callback,data){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user : "aaryanse811@gmail.com",
            pass: "mhmz tfft dblo zbrs"
        }
    });
    const mailOption = {
        from : "aaryanse811@gmail.com",
        to : email,
        subject : "Verification mail",
        html : data
    }
    transporter.sendMail(mailOption,(err,info)=>{
        if(err)
            console.log("error in mailer ",err);
        else{
            console.log("Mail Sent from mailer");
            callback(info);
        }
    });
}
export default {mailer:mailer};