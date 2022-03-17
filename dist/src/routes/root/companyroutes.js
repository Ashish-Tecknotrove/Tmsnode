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
const company_validator_1 = __importDefault(require("../../validator/root/company.validator"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const company_controller_1 = __importDefault(require("../../app/root/company.controller"));
const Router = express.Router();
var multer = require('multer');
var formData = multer();
//TODO COMPANY ROUTES
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resources/company_logo');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
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
Router.post('/uploadTest', upload.array('picture_pic', 5), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(200);
}));
//TODO Register New Company
Router.post('/registerCompany', auth_1.default.verifyAuthenticateToken, upload.single('picture_pic'), //FormData With File
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}), company_validator_1.default.registerCommpanyParameter(), auth_1.default.handleValidatorError, company_controller_1.default.registerCompany);
//TODO Update Company
Router.post('/updateCompany', auth_1.default.verifyAuthenticateToken, upload.single('picture_pic'), //FormData With File
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}), company_validator_1.default.updateCommpanyParameter(), auth_1.default.handleValidatorError, company_controller_1.default.updateCompany);
//TODO Delete Company
Router.post('/deleteCompany', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.deleteCommpanyParameter(), auth_1.default.handleValidatorError, company_controller_1.default.deleteCompany);
//TODO GET Company
Router.post('/getRegisterCompany', formData.any(), auth_1.default.verifyAuthenticateToken, company_controller_1.default.getCompany);
Router.get('/company_count', company_controller_1.default.total_companies);
//TODO Company Login
//Create New User
Router.post('/addCompanyUserLogin', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.companyPersonLogin(), auth_1.default.handleValidatorError, company_controller_1.default.add_company_login);
// Get Company New User
Router.post('/getCompanyUser', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.getcompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_user);
Router.post('/updatedCompanyUser', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.updatecompanyPersonLogin(), auth_1.default.handleValidatorError, company_controller_1.default.updated_company_user);
Router.post('/deleteCompanyUser', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.deletecompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.delete_company_user);
Router.post('/getCompanyDetailsById', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.getcompanyPerson(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_details_by_id);
// -----------------Trainee Customize Form
Router.post('/getTraineeCustomForm', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.getTraineeCustomFormValidator(), auth_1.default.handleValidatorError, company_controller_1.default.get_trainee_customize_form);
//----------Dashboard Cards
Router.post('/get_company_card1_data', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.get_company_card1_data(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card1_data);
Router.post('/get_company_card2_data', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.get_company_card1_data(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card2_data);
Router.post('/get_company_card2_data_by_trainer', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.get_company_card2_data_by_trainer(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card2_data);
Router.post('/get_company_card3_data', formData.any(), auth_1.default.verifyAuthenticateToken, company_validator_1.default.get_company_card3_data(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card3_data);
exports.default = Router;
