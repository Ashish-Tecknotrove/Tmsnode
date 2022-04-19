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
const auth_1 = __importDefault(require("../../../../../core/middleware/auth"));
const clinical_controller_1 = __importDefault(require("../../../controller/driving/clinical/clinical.controller"));
const clinical_validators_1 = __importDefault(require("../../../validator/driving/clinical.validators"));
const ClinicalRoutes = express.Router();
var multer = require('multer');
var formData = multer();
ClinicalRoutes.post('/getClinicalDasboard', formData.none(), clinical_controller_1.default.get_clinical_dashboard_report);
ClinicalRoutes.post('/storeClinicalData', formData.none(), auth_1.default.verify_trainerAdmin_AuthenticateToken, //?? TRAINER APIS ARE ALLOWED TO STORED CLINICAL DATA
clinical_validators_1.default.StoreDataValidator(), auth_1.default.handleValidatorError, clinical_controller_1.default.storeClinicalData);
ClinicalRoutes.post("/getClinicalCurriculum", formData.none(), auth_1.default.verify_trainerAdmin_AuthenticateToken, //?? TRAINER APIS ARE ALLOWED TO STORED CLINICAL DATA
clinical_validators_1.default.ClinicalCurriculum(), auth_1.default.handleValidatorError, clinical_controller_1.default.getClinicalCurriculum);
ClinicalRoutes.post("/getClinicalAssignTrainee", formData.none(), auth_1.default.verify_trainerAdmin_AuthenticateToken, //?? TRAINER APIS ARE ALLOWED TO STORED CLINICAL DATA
clinical_validators_1.default.GetAssignedTrainee(), auth_1.default.handleValidatorError, clinical_controller_1.default.getClinical_AssignedTrainee);
ClinicalRoutes.post('/getClinicalTestReport', formData.none(), auth_1.default.verify_traineeAdmin_AuthenticateToken, clinical_validators_1.default.getClinicalTestReport(), auth_1.default.handleValidatorError, clinical_controller_1.default.getClinicalTestReport);
ClinicalRoutes.post('/getClinicalTestConsolidatedReport', formData.none(), auth_1.default.verify_traineeAdmin_AuthenticateToken, clinical_validators_1.default.getClinicalTestConsolidatedReport(), auth_1.default.handleValidatorError, clinical_controller_1.default.getClinicalTestConsolidatedReport);
exports.default = ClinicalRoutes;
