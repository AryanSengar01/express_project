import express from 'express';
var candidateRouter = express.Router();
candidateRouter.use(express.static('public'));
candidateRouter.get("/candidatelogin",(request,response)=>{
    response.render("candidatelogin");
});
candidateRouter.get("/candidateregistration",(request,response)=>{
    response.render("candidateregistration");
});


export default candidateRouter;