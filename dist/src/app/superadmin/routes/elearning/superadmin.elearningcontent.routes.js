"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const moment_1 = __importDefault(require("moment"));
const elearningContent_controller_1 = __importDefault(require("../../controller/elearning/elearningContent.controller"));
const auth_1 = __importDefault(require("../../../../core/middleware/auth"));
const response_codes_1 = __importDefault(require("../../../../core/strings/response-codes"));
const elearning_validator_1 = __importDefault(require("../../validator/root/elearning.validator"));
// import fs from "fs";
// import  unzip  from 'unzip';
const super_admin_elearning_router = express.Router();
const authentication = auth_1.default.verify_superAdmin_AuthenticateToken;
var multer = require('multer');
var formData = multer();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("file.fieldname->",file.fieldname);
        if (file.fieldname === "testfile") { // if uploading zip
            cb(null, './resources/coursezip');
        }
        else {
            cb(null, './resources/coursethumb');
        }
    },
    filename: function (req, file, cb) {
        cb(null, (0, moment_1.default)().format('YYYYMMDDHHmmss') + '_' + file.originalname.toLowerCase().split(' ').join('_'));
    }
});
const fileFilter = (req, file, cb) => {
    // console.log("file->", file);
    if (file.fieldname === "testfile") { // if uploading zip
        if (file.mimetype == "application/zip" || file.mimetype == 'application/x-zip-compressed') {
            cb(null, true);
        }
        else {
            cb({
                success: false,
                message: 'Invalid file type. Only .zip files are allowed.'
            }, false);
            //   cb(null, false);
            // cb(new Error('Only .zip format allowed!'));
        }
    }
    else {
        if (file.mimetype == "image/png" || file.mimetype == 'image/jpeg') {
            cb(null, true);
        }
        else {
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
function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        uploadLink(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("Multer error->", err);
                // A Multer error occurred when uploading.
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            }
            else if (err) {
                // An unknown error occurred when uploading.
                console.log("unknown error->", err);
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            }
            else {
                // var dirPath ="../../../resources/test/";
                // var destPath ="./resources/test/";
                // fs.createReadStream(dirPath).pipe(unzip.Extract({ path: destPath }));
                console.log("Everything went fine");
                next();
            }
        });
    });
}, auth_1.default.handleValidatorError, elearningContent_controller_1.default.elearningTestLink);
super_admin_elearning_router.post('/addElearningTestThumbnail', authentication, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        uploadThumb(req, res, function (err) {
            /*if (err instanceof multer.MulterError) {
                if (err.code == 'LIMIT_FILE_SIZE') {
                    err.message = 'File Size is too large. Allowed fil size is 200KB';
                    err.success = false;

                }
                console.log("Multer error->", err);
                // A Multer error occurred when uploading.
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code: 0, message: err});
            } else */ if (err) {
                console.log("unknown error->", err);
                if (err.code == 'LIMIT_FILE_SIZE') {
                    err.message = 'File Size is too large. Allowed file size is 200KB';
                    err.success = false;
                }
                console.log("unknown error->", err);
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                // An unknown error occurred when uploading.
            }
            else {
                // var dirPath ="../../../resources/test/";
                // var destPath ="./resources/test/";
                // fs.createReadStream(dirPath).pipe(unzip.Extract({ path: destPath }));
                console.log("Everything went fine");
                next();
            }
        });
    });
}, auth_1.default.handleValidatorError, elearningContent_controller_1.default.elearningTestThumbnail);
super_admin_elearning_router.post('/updateElearningTestLink', authentication, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        uploadLink(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            }
            else if (err) {
                // An unknown error occurred when uploading.
                console.log("unknown error->", err);
                res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    response_code: 0,
                    message: err
                    // message: "Only .zip format allowed!"
                });
            }
            else {
                // console.log("req.files->", req.files)
                console.log("Everything went fine");
                next();
            }
        });
    });
}, elearning_validator_1.default.checkElearningId(), auth_1.default.handleValidatorError, elearningContent_controller_1.default.updateElearnigTestLink);
super_admin_elearning_router.post('/getElearningTestLink', formData.none(), authentication, elearning_validator_1.default.getElearning(), auth_1.default.handleValidatorError, elearningContent_controller_1.default.getElearnigTestLink);
super_admin_elearning_router.post('/deleteElearningTestLink', formData.none(), authentication, elearning_validator_1.default.checkElearningId(), auth_1.default.handleValidatorError, elearningContent_controller_1.default.deleteElearningTestLink);
exports.default = super_admin_elearning_router;
