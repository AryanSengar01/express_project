import express from "express";
import cookieparser from "cookie-parser";
import indexRouter from "./router/indexRouter.js";
import candidateRouter from "./router/candidateRouter.js";
import recruiterRouter from "./router/recruiterRouter.js";
import adminRouter from "./router/adminRouter.js";
import expressFileUpload from "express-fileupload";

var app = express();

app.use(expressFileUpload());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set("views","views");
app.set("view engine","ejs");

app.use("/",indexRouter);
app.use("/admin",adminRouter);
app.use("/candidate",candidateRouter);
app.use("/recruiter",recruiterRouter);

app.listen(3000,()=>{
    console.log("Server Established Successfully");
});

