import * as express from "express";
import {NextFunction} from "express";
import {Request, Response} from "express";
import { check } from "express-validator";
import moment from "moment";
import ElearningContent from '../../app/elearning/elearningContent.controller';
import auth from "../../middleware/auth";
import elearningValidator from "../../validator/root/elearning.validator";

const Router = express.Router();

var multer = require('multer');
var formData = multer();

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './resources/test')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, moment().format('YYYYMMDDHHmmss')+'_'+file.originalname)
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    // if (file.mimetype === "zip") {

    //     cb(null, true);
    // } else {
    //     cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    // }
};

 
const upload = multer({storage: storage});

Router.post('/addElearningTestLink',
    // formData.none(),
    auth.verifyAuthenticateToken,
    elearningValidator.checkElearning(),
    auth.handleValidatorError,
    check('testfile').custom((value, {req}) => {
            if(req.files.mimetype === 'application/zip'){
                return '.zip'; // return "non-falsy" value to indicate valid data"
            }else{
                return false; // return "falsy" value to indicate invalid data
            }
        })
    .withMessage('Please only submit zip documents.'), // custom error message that will be send back if the file in not a pdf. 
    
    upload.single('testfile'),
    async (req: Request, res: Response, next: NextFunction) => {
        next();
    },
    ElearningContent.elearningTestLink,
);


export default Router;
