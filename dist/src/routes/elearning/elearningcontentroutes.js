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
const express_validator_1 = require("express-validator");
const moment_1 = __importDefault(require("moment"));
const elearningContent_controller_1 = __importDefault(require("../../app/elearning/elearningContent.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const elearning_validator_1 = __importDefault(require("../../validator/root/elearning.validator"));
const Router = express.Router();
var multer = require('multer');
var formData = multer();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resources/test');
    },
    filename: function (req, file, cb) {
        cb(null, (0, moment_1.default)().format('YYYYMMDDHHmmss') + '_' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // if (file.mimetype === "zip") {
    //     cb(null, true);
    // } else {
    //     cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    // }
};
const upload = multer({ storage: storage });
Router.post('/addElearningTestLink', 
// formData.none(),
auth_1.default.verifyAuthenticateToken, elearning_validator_1.default.checkElearning(), auth_1.default.handleValidatorError, (0, express_validator_1.check)('testfile').custom((value, { req }) => {
    if (req.files.mimetype === 'application/zip') {
        return '.zip'; // return "non-falsy" value to indicate valid data"
    }
    else {
        return false; // return "falsy" value to indicate invalid data
    }
})
    .withMessage('Please only submit zip documents.'), // custom error message that will be send back if the file in not a pdf. 
upload.single('testfile'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}), elearningContent_controller_1.default.elearningTestLink);
exports.default = Router;
