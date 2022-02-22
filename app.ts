import dotenv  from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import root_route from "./src/routes/root/root_routes" ;
import curriculumroutes from "./src/routes/root/curriculumroutes";
import companyroutes from "./src/routes/root/companyroutes";
import subscriptionroutes from "./src/routes/root/subscriptionroutes";
import elearningroutes from "./src/routes/elearning/elearningcontentroutes";
import Languages from "./src/model/language/language.model";
import LanguageRoutes from "./src/routes/language/language.routes";
import TraineeRoutes from './src/routes/root/traineeroutes';
import morgan from "morgan";
import trainerRoutes from "./src/routes/root/trainerroutes";

process.env.TZ = "Asia/Calcutta";
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
    });

    console.log(nDate); 
   //multer 
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
app.use('/resources',express.static('resources'));

app.listen(process.env.PORT || 8000,()=>{
    console.log("Node Server Started Running")
});

app.use("/TMS",root_route);
app.use("/TMS",curriculumroutes);
app.use("/TMS",companyroutes);
app.use("/TMS/subscription",subscriptionroutes);
app.use("/TMS/elearning",elearningroutes);
app.use("/TMS",LanguageRoutes)
app.use("/TMS",TraineeRoutes)
app.use("/TMS/companyadmin",trainerRoutes);

app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(express.static(__dirname));

app.get('/',(req,res)=>{

    res.status(200).json({message:"Welcome To TMS"});
});

export default app;


