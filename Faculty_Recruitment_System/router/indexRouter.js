import express from 'express';
var indexRouter = express.Router();

indexRouter.get("/",(request,response)=>{
    response.render("index");
});

indexRouter.get("/services",(request,response)=>{
    response.render("services");
})

indexRouter.get("/contact",(request,response)=>{
    response.render("contact");
})

indexRouter.get("/about",(request,response)=>{
    response.render("about");
})
export default indexRouter;