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
const multer = require("multer");
const company_validator_1 = __importDefault(require("../../validator/root/company.validator"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const company_controller_1 = __importDefault(require("../../app/root/company.controller"));
const Router = express.Router();
//TODO COMPANY ROUTES
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resources/company_logo');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
Router.post('/uploadTest', upload.array('image', 5), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(200);
}));
//TODO Register New Company
Router.post('/registerCompany', auth_1.default.verifyAuthenticateToken, upload.array('picture_pic', 5), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}), company_validator_1.default.registerCommpanyParameter(), auth_1.default.handleValidatorError, company_controller_1.default.registerCompany);
//Create New User
Router.post('/addCompanyUser', auth_1.default.verifyAuthenticateToken, company_validator_1.default.companyPersonofcontact(), auth_1.default.handleValidatorError, company_controller_1.default.add_company_user);
exports.default = Router;
