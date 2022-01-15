import dotenv  from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import root_route from "./src/routes/root/root_routes" ;
import curriculumroutes from "./src/routes/root/curriculumroutes";
import companyroutes from "./src/routes/root/companyroutes";
import subscriptionroutes from "./src/routes/root/subscriptionroutes";
import Languages from "./src/model/language/language.model";
import LanguageRoutes from "./src/routes/language/language.routes";


var multer = require('multer');
var formData = multer();
var cors = require('cors');

const app = express();

dotenv.config();

//app.use(bodyParser());
app.use(bodyParser.json()); // For Accepting the JSON Data
app.use(bodyParser.urlencoded()); // For Accepting the x-www-form-Data
app.use(bodyParser.urlencoded({extended:true }));
app.use(cors());
//app.use(formdata.array());
app.use(express.static('public'));

app.listen(process.env.PORT || 8000,()=>{
    console.log("Node Server Started Running")
});

app.use("/TMS",root_route);
app.use("/TMS",curriculumroutes);
app.use("/TMS",companyroutes);
app.use("/TMS/subscription",subscriptionroutes);
// app.use("/api/v1/",LanguageRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome To TMS"});
});

export default app;
