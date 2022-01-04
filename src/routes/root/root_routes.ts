import  * as express  from "express";
import loginController from "../../app/root/login.controller";
import auth from "../../middleware/auth";
import loginValidator from "../../validator/root/login.validator";
import multer = require("multer");
import {NextFunction} from "express";
import { Request, Response } from "express";
import companyValidator from "../../validator/root/company.validator";
import companyController from "../../app/root/company.controller";
import Company from "../../model/root/company.model";



const Router = express.Router();


//TODO LOGIN ROUTES
Router.post('/authentication',
    loginValidator.checkLoginParameters(),
    auth.handleValidatorError,
    loginController.login
)


//TODO COMPANY ROUTES
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'resources/company_logo')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});


const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {

        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});


Router.post('/uploadTest', upload.array('images', 5), 
async (req: Request,res: Response, next: NextFunction) => {
    res.send(401);
});

//TODO Register New Company
Router.post('/registerCompany',
auth.verifyAuthenticateToken,
companyValidator.registerCommpanyParameter(),
auth.handleValidatorError,
companyController.registerCompany,
);

//Create New User
Router.post('/addCompanyUser',
auth.verifyAuthenticateToken,
companyValidator.companyPersonofcontact(),
auth.handleValidatorError,
companyController.add_company_user
);

export default Router;

