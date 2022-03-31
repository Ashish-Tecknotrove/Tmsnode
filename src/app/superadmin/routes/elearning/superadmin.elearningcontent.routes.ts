import {any} from 'bluebird';
import * as express from "express";
import {NextFunction} from "express";
import {Request, Response} from "express";
import {check} from "express-validator";
import moment from "moment";
import ElearningContent from '../../controller/elearning/elearningContent.controller';
import auth from "../../../../core/middleware/auth";
import responseCodes from '../../../../core/strings/response-codes';
import elearningValidator from '../../validator/root/elearning.validator';
// import fs from "fs";
// import  unzip  from 'unzip';

const super_admin_elearning_router = express.Router();
const authentication=auth.verify_superAdmin_AuthenticateToken;

var multer = require('multer');
var formData = multer();

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        // console.log("file.fieldname->",file.fieldname);
        if (file.fieldname === "testfile") { // if uploading zip
            cb(null, './resources/coursezip')
        } else {
            cb(null, './resources/coursethumb')
        }
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname.toLowerCase().split(' ').join('_'))
    }
});
const fileFilter = (req: any, file: any, cb: any) => {
    // console.log("file->", file);

    if (file.fieldname === "testfile") { // if uploading zip
        if (file.mimetype == "application/zip" || file.mimetype == 'application/x-zip-compressed') {
            cb(null, true);
        } else {
            cb({
                success: false,
                message: 'Invalid file type. Only .zip files are allowed.'
            }, false);
            //   cb(null, false);
            // cb(new Error('Only .zip format allowed!'));
        }
    } else {
        if (file.mimetype == "image/png" || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb({
                success: false,
                message: 'Invalid file type. Only jpg, png image files are allowed.'
            }, false);
            //   cb(null, false);
            // cb(new Error('Only .png and .jpg format allowed!'));
        }
    }

};

const uploadLink = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('testfile');

const uploadThumb = multer({
    storage: storage,
    limits: {
        fileSize: 200000 // 200 KB
    },
    fileFilter: fileFilter
}).single('testThumb');

super_admin_elearning_router.post('/addElearningTestLink',
    // formData.any(),
    authentication,
    // ElearningContent.checkUploadElearningLinkFile,
    async function (req: Request, res: Response, next: NextFunction) {
        uploadLink(req, res, function (err: any) {
            if (err instanceof multer.MulterError) {
                console.log("Multer error->", err);
                // A Multer error occurred when uploading.
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
            } else if (err) {
                // An unknown error occurred when uploading.
                console.log("unknown error->", err);
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
            } else {

                // var dirPath ="../../../resources/test/";
                // var destPath ="./resources/test/";
                // fs.createReadStream(dirPath).pipe(unzip.Extract({ path: destPath }));

                console.log("Everything went fine");
                next();
            }
        })
    },
    auth.handleValidatorError,
    ElearningContent.elearningTestLink,
);

super_admin_elearning_router.post('/addElearningTestThumbnail',
    authentication,
    async function (req: Request, res: Response, next: NextFunction) {
        uploadThumb(req, res, function (err: any) {
            /*if (err instanceof multer.MulterError) {
                if (err.code == 'LIMIT_FILE_SIZE') {
                    err.message = 'File Size is too large. Allowed fil size is 200KB';
                    err.success = false;

                }
                console.log("Multer error->", err);
                // A Multer error occurred when uploading.
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
            } else */if (err) {
                console.log("unknown error->", err);
                if (err.code == 'LIMIT_FILE_SIZE') {
                    err.message = 'File Size is too large. Allowed file size is 200KB';
                    err.success = false;

                }
                console.log("unknown error->", err);
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
                // An unknown error occurred when uploading.

            } else {

                // var dirPath ="../../../resources/test/";
                // var destPath ="./resources/test/";
                // fs.createReadStream(dirPath).pipe(unzip.Extract({ path: destPath }));

                console.log("Everything went fine");

                next();
            }
        })
    },
    auth.handleValidatorError,
    ElearningContent.elearningTestThumbnail,
);


super_admin_elearning_router.post('/updateElearningTestLink',
    authentication,
    async function (req: Request, res: Response, next: NextFunction) {

        uploadLink(req, res, function (err: any) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
            } else if (err) {
                // An unknown error occurred when uploading.
                console.log("unknown error->", err);
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err
                    // message: "Only .zip format allowed!"
                });
            } else {
                // console.log("req.files->", req.files)
                console.log("Everything went fine");
                next();
            }
        })
    },
    elearningValidator.checkElearningId(),
    auth.handleValidatorError,
    ElearningContent.updateElearnigTestLink,
);

super_admin_elearning_router.post('/getElearningTestLink',
    formData.none(),
    authentication,
    elearningValidator.getElearning(),
    auth.handleValidatorError,
    ElearningContent.getElearnigTestLink
)

super_admin_elearning_router.post('/deleteElearningTestLink',
    formData.none(),
    authentication,
    elearningValidator.checkElearningId(),
    auth.handleValidatorError,
    ElearningContent.deleteElearningTestLink
);


export default super_admin_elearning_router;
