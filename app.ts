import dotenv  from "dotenv";
import express from "express";

import bodyParser from "body-parser";

import root_route from "./src/routes/root/root_routes" ;
import curriculumroutes from "./src/routes/root/curriculumroutes";
import Languages from "./src/model/language/language.model";
import LanguageRoutes from "./src/routes/language/language.routes";


var multer = require('multer');
var upload = multer();

const app = express();
const form = multer();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));

app.use(upload.array()); 
app.use(express.static('public'));

// app.listen(process.env.PORT || 3000,()=>{
//     console.log("Node Server Started Running")
// });

app.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:5000');
});

app.use("/TMS",root_route);
app.use("/TMS",curriculumroutes);
// app.use("/api/v1/",LanguageRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome To TMS"});
});
