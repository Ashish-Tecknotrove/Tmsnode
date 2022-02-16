import { any } from 'bluebird';
import * as express from "express";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { check } from "express-validator";
import moment from "moment";
import ElearningContent from '../../app/elearning/elearningContent.controller';
import auth from "../../middleware/auth";
import responseCodes from '../../strings/response-codes';
import elearningValidator from "../../validator/root/elearning.validator";
// import fs from "fs";
// import  unzip  from 'unzip';

const Router = express.Router();

var multer = require('multer');
var formData = multer();

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, './resources/test')
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname.toLowerCase().split(' ').join('_'))
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  console.log("file->", file);
  if (file.mimetype == "application/zip" || file.mimetype == 'application/x-zip-compressed') {
    cb(null, true);
  } else {
    //   cb(null, false);
    cb(new Error('Only .zip format allowed!'));
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('testfile');



Router.post('/addElearningTestLink',
  // formData.any(),
  auth.verifyAuthenticateToken,
  // ElearningContent.checkUploadElearningLinkFile,
  async function (req: Request, res: Response, next: NextFunction) {
    upload(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        console.log("Multer error->", err);
        // A Multer error occurred when uploading.
        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log("unknown error->", err);
        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
      } else {

        // var dirPath ="../../../resources/test/";
        // var destPath ="./resources/test/";
        // fs.createReadStream(dirPath).pipe(unzip.Extract({ path: destPath }));

        console.log("Everything went fine");
        next();
      }
    })
  },
  // elearningValidator.checkElearning(),
  // auth.handleValidatorError,
  ElearningContent.elearningTestLink,
);

Router.post('/updateElearningTestLink',
  auth.verifyAuthenticateToken,
  async function (req: Request, res: Response, next: NextFunction) {
    upload(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log("unknown error->", err);
        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:  "Only .zip format allowed!" });
      } else {
        console.log("Everything went fine");
        next();
      }
    })
  },
  elearningValidator.checkElearningId(),
  auth.handleValidatorError,
  ElearningContent.updateElearnigTestLink,
);

Router.post('/getElearningTestLink',
  formData.none(),
  auth.verifyAuthenticateToken,
  elearningValidator.getElearning(),
  auth.handleValidatorError,
  ElearningContent.getElearnigTestLink
)

Router.post('/deleteElearningTestLink',
  formData.none(),
  auth.verifyAuthenticateToken,
  elearningValidator.checkElearningId(),
  auth.handleValidatorError,
  ElearningContent.deleteElearningTestLink
);


export default Router;
