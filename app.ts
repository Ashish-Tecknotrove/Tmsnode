import dotenv  from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "./src/auth/authentication.routes";

import SuperAdminRoutes from "./src/app/superadmin/routes/root/superadmin.routes";
import super_admin_elearning_router from "./src/app/superadmin/routes/elearning/superadmin.elearningcontent.routes";

import CompanyAdminRoutes from "./src/app/companyadmin/routes/root/company_admin.routes";
import CompanyAdminReportsRoutes from "./src/app/companyadmin/routes/root/reports.routes";

import TrainerRoutes from "./src/app/trainer/routes/root/trainer.routes";
import TrainerReportsRoutes from "./src/app/trainer/routes/root/reports.routes";

import ElearningTraineeRoutes from "./src/app/trainee/routes/elearning/trainee.elearning.routes";
import TraineeRootRoutes from "./src/app/trainee/routes/root/trainee.root.routes";
import TraineeDashboard from "./src/app/trainee/routes/root/trainee.dashboard.routes";

import resources from "./src/resources/additionalresources.routes";
import ClinicalRoutes from "./src/app/trainee/routes/driving/clinical/clinical.routes";
import BranchAdminRoutes from "./src/app/companyadmin/branchadmin/branchadmin.routes";
import DepartmentAdminRoutes from "./src/app/companyadmin/departmentadmin/departmentadmin.routes";




process.env.TZ = "Asia/Calcutta";
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
    });

    console.log(nDate); 
    
var multer = require('multer');
var formData = multer();
var cors = require('cors');

const app = express();

dotenv.config();

//controller.use(bodyParser());
app.use(bodyParser.json()); // For Accepting the JSON Data
app.use(bodyParser.urlencoded()); // For Accepting the x-www-form-Data
app.use(bodyParser.urlencoded({extended:true }));
app.use(cors());
//controller.use(formdata.array());
app.use('/resources',express.static('resources'));

app.listen(process.env.PORT || 8000,()=>{
    console.log("Node Server Started Running")
});

app.disable('x-powered-by');


//TODO ROUTES
app.use("/TMS/auth",authRoutes);
app.use("/TMS/resources",resources)

//TODO SUPER ADMIN ROUTES
app.use("/TMS/superadmin",SuperAdminRoutes);
app.use("/TMS/superadmin/elearning",super_admin_elearning_router);
//TODO SUPER ADMIN ROUTES ENDS

//TODO TRAINEE ROUTES
app.use("/TMS/trainee",TraineeRootRoutes)
app.use("/TMS/trainee/elearning",ElearningTraineeRoutes);
app.use("/TMS/trainee/clinical/",ClinicalRoutes);
app.use("/TMS/trainee/dashboard/",TraineeDashboard);


//TODO TRAINEE ROUTES --END

//TODO COMPANY ADMIN ROUTES
app.use("/TMS/companyadmin",CompanyAdminRoutes);
app.use("/TMS/companyadmin/reports",CompanyAdminReportsRoutes);
//TODO COMPANY ADMIN ROUTES --END

//TODO TRAINER ROUTES
app.use("/TMS/trainer",TrainerRoutes);
app.use("/TMS/trainer/reports",TrainerReportsRoutes);
//TODO TRAINER ROUTES --END

//TODO Branch Admin Routes
app.use("/TMS/companyadmin/branchadmin",BranchAdminRoutes);
app.use("/TMS/companyadmin/departmentadmin",DepartmentAdminRoutes);


app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(express.static(__dirname));

app.get('/',(req,res)=>{

    res.status(200).json({message:"Welcome To TMS"});
});

export default app;


