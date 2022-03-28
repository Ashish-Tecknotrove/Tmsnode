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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const subcompany_controller_1 = __importDefault(require("../../app/root/subcompany.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const subcompany_validator_1 = __importDefault(require("../../validator/root/subcompany.validator"));
const Router = express.Router();
var multer = require('multer');
var formData = multer();
Router.post('/registerSubcompany', formData.none(), auth_1.default.verifyAuthenticateToken, subcompany_validator_1.default.registerSubcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.registerSubCompany);
Router.post('/getSubcompany', formData.none(), auth_1.default.verifyAuthenticateToken, subcompany_validator_1.default.getSubcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.getSubcompany);
Router.post('/getSubcompanyDetails', formData.none(), auth_1.default.verifyAuthenticateToken, subcompany_validator_1.default.getSubcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.getSubcompany_detail_info);
Router.post('/assignDepartment', formData.none(), auth_1.default.verifyAuthenticateToken, subcompany_validator_1.default.assignDepartmentValidator(), auth_1.default.handleValidatorError, subcompany_controller_1.default.assign_department_to_subcompany);
Router.post('/assignTrainerToSubCompany', formData.none(), auth_1.default.verifyAuthenticateToken, subcompany_validator_1.default.assignTrainerValidator(), auth_1.default.handleValidatorError, subcompany_controller_1.default.assign_trainer_to_subcompany);
Router.post('/getSubCompanyList', formData.none(), auth_1.default.verifyAuthenticateToken, subcompany_validator_1.default.getSubcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.getSubCompanyList);
Router.post('/block_unblock_subcompany', formData.none(), auth_1.default.verifyAuthenticateToken, subcompany_validator_1.default.block_unblock_subcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.block_unblock_subcompany);
Router.post('/edit_subcompany', formData.none(), auth_1.default.verifyAuthenticateToken, subcompany_validator_1.default.edit_subcompany(), auth_1.default.handleValidatorError, subcompany_controller_1.default.edit_subcompany);
exports.default = Router;
