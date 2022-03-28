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
const company_department_controller_1 = __importDefault(require("../../app/root/company_department.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const company_department_validator_1 = __importDefault(require("../../validator/root/company_department.validator"));
const Router = express.Router();
var multer = require("multer");
var formData = multer();
Router.post("/assignTrainersToDepartment_SubCompany", formData.none(), auth_1.default.verifyAuthenticateToken, company_department_validator_1.default.assignTrainersToDepartment_SubCompany(), auth_1.default.handleValidatorError, company_department_controller_1.default.assignTrainersToDepartment_SubCompany);
Router.post("/addDepartment", formData.none(), auth_1.default.verifyAuthenticateToken, company_department_validator_1.default.addDepartmentValidator(), auth_1.default.handleValidatorError, company_department_controller_1.default.addDepartment);
Router.post("/getDepartmentDetails", formData.none(), auth_1.default.verifyAuthenticateToken, company_department_validator_1.default.getDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.departmentDetails);
Router.post("/getCompanyDepartment", formData.none(), auth_1.default.verifyAuthenticateToken, company_department_validator_1.default.getDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.getCompanyDepartment);
//* Gold Panel
Router.post("/getCompanyDepartmentList", formData.none(), auth_1.default.verifyAuthenticateToken, company_department_validator_1.default.getDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.getCompanyDepartmentList);
//* Gold Panel
Router.post("/blockUnblockCompanyDepartment", formData.none(), auth_1.default.verifyAuthenticateToken, company_department_validator_1.default.blockUnblockCompanyDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.blockUnblockCompanyDepartment);
//* Gold Panel
Router.post("/editCompanyDepartment", formData.none(), auth_1.default.verifyAuthenticateToken, company_department_validator_1.default.editCompanyDepartment(), auth_1.default.handleValidatorError, company_department_controller_1.default.editCompanyDepartment);
/*
Router.post('/updateMasterDepartment',
    formData.none(),
    auth.verifyAuthenticateToken,
    master_departmentValidator.updateMasterDepartment(),
    auth.handleValidatorError,
    master_departmentController.updateMasterDepartment
);

Router.post('/deleteMasterDepartment',
    formData.none(),
    auth.verifyAuthenticateToken,
    master_departmentValidator.deleteMasterDepartment(),
    auth.handleValidatorError,
    master_departmentController.deleteMasterDepartment
);

Router.post('/getMasterDepartment',
    formData.none(),
    auth.verifyAuthenticateToken,
    master_departmentValidator.getMasterDepartment(),
    auth.handleValidatorError,
    master_departmentController.getMasterDepartment
); */
exports.default = Router;
