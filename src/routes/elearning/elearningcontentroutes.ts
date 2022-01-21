import * as express from "express";
//import multer = require("multer");
import {NextFunction} from "express";
import {Request, Response} from "express";
import ElearningContent from '../../app/elearning/elearningContent.controller';
import auth from "../../middleware/auth";

const Router = express.Router();

var multer = require('multer');
var formData = multer();

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './resources/test')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
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
    upload.single('testfile'), //FormData With File
    async (req: Request, res: Response, next: NextFunction) => {
        next();
    },
    ElearningContent.elearningTestLink,
);


export default Router;
