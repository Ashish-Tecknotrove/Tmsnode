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
const auth_1 = __importDefault(require("../../../../core/middleware/auth"));
const elearningTrainer_controller_1 = __importDefault(require("../../controller/elearning/elearningTrainer.controller"));
const company_controller_1 = __importDefault(require("../../controller/root/company.controller"));
const trainee_controller_1 = __importDefault(require("../../controller/root/trainee.controller"));
const company_validator_1 = __importDefault(require("../../validator/root/company.validator"));
const trainee_validator_1 = __importDefault(require("../../validator/root/trainee.validator"));
const Router = express.Router();
var multer = require("multer");
var formData = multer();
//----- Start CompanyController ---------------------------------------------------
Router.post('/get_company_card2_data', formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, company_validator_1.default.get_company_card1_data(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card2_data);
Router.post('/get_company_card2_data_by_trainer', formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, company_validator_1.default.get_company_card2_data_by_trainer(), auth_1.default.handleValidatorError, company_controller_1.default.get_company_card2_data);
Router.post('/getCurriculumWithSubscriptionCheck', formData.none(), auth_1.default.verify_trainerAdmin_AuthenticateToken, company_validator_1.default.getCurriculumWithSubscriptionCheck(), auth_1.default.handleValidatorError, company_controller_1.default.getCurriculum_with_subscription_check);
//----- End CompanyController ---------------------------------------------------
//----- Start TraineeController ---------------------------------------------------
Router.post("/getAssignTraineeOfTrainer", formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, trainee_validator_1.default.getAssignTraineeOfTrainer(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeOfTrainer);
Router.post("/getAssignTraineeToTrainer", formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, trainee_validator_1.default.getAssignTraineeOfTrainer(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeToTrainer);
Router.post("/getAssignTraineeCurriculum", formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, trainee_validator_1.default.getAssignTraineeCurriculum(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeCurriculum);
//TODO TRAINEE DASHBOARD
Router.post("/getTechnologiesAllotedToTrainee", formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, trainee_validator_1.default.getAssignTraineeCurriculumValidator(), auth_1.default.handleValidatorError, trainee_controller_1.default.getTechnologiesAllotedToTrainee);
Router.post('/getTraineeRemarks', formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, trainee_validator_1.default.getTraineeRemarks(), auth_1.default.handleValidatorError, trainee_controller_1.default.getTraineeRemarks);
Router.post('/addTraineeRemarks', formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, trainee_validator_1.default.addTraineeRemarks(), auth_1.default.handleValidatorError, trainee_controller_1.default.addTraineeRemarks);
Router.post('/updateTraineeRemarks', formData.any(), auth_1.default.verify_trainerAdmin_AuthenticateToken, trainee_validator_1.default.updateTraineeRemarks(), auth_1.default.handleValidatorError, trainee_controller_1.default.updateTraineeRemarks);
//----- Start TraineeController ---------------------------------------------------
//----- Start ElearningTraineeTest ---------------------------------------------------
Router.post('/getElearningProgressDataForTrainer', formData.none(), auth_1.default.verify_trainerAdmin_AuthenticateToken, trainee_validator_1.default.getElearning_Test_trainee_dashboard(), auth_1.default.handleValidatorError, elearningTrainer_controller_1.default.getElearningProgressDataForTrainer);
//----- Start ElearningTraineeTest ---------------------------------------------------
exports.default = Router;
