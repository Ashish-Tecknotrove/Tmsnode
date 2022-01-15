import * as express from "express";
//import multer = require("multer");
import {NextFunction} from "express";
import {Request, Response} from "express";
import companyValidator from "../../validator/root/company.validator";
import auth from "../../middleware/auth";
import companyController from "../../app/root/company.controller";

const Router = express.Router();

var multer = require('multer');
var formData = multer();

//TODO COMPANY ROUTES
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './resources/company_logo')
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


Router.post('/uploadTest', upload.array('picture_pic', 5),
    async (req: Request, res: Response, next: NextFunction) => {

        res.send(200);
    });

//TODO Register New Company
Router.post('/registerCompany',
    auth.verifyAuthenticateToken,
    upload.single('picture_pic'), //FormData With File
    async (req: Request, res: Response, next: NextFunction) => {
        next();
    },
    companyValidator.registerCommpanyParameter(),
    auth.handleValidatorError,
    companyController.registerCompany,
);

//Create New User
Router.post('/addCompanyUserLogin',
    formData.any(),
    auth.verifyAuthenticateToken,
    companyValidator.companyPersonLogin(),
    auth.handleValidatorError,
    companyController.add_company_login
);


export default Router;