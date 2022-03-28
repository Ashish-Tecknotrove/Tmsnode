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
const elearningTraineeTest_controller_1 = __importDefault(require("../../app/elearning/elearningTraineeTest.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const elearning_validator_1 = __importDefault(require("../../validator/root/elearning.validator"));
const ElearningTraineeRoutes = express.Router();
var multer = require('multer');
var formData = multer();
ElearningTraineeRoutes.post('/getElearningDataTrainee', formData.none(), auth_1.default.verifyAuthenticateToken, elearning_validator_1.default.getElearning_Test_trainee_dashboard(), auth_1.default.handleValidatorError, elearningTraineeTest_controller_1.default.getElearningTestData);
ElearningTraineeRoutes.post('/start_training_session', formData.none(), auth_1.default.verifyAuthenticateToken, elearning_validator_1.default.session_validator(), auth_1.default.handleValidatorError, elearningTraineeTest_controller_1.default.start_training_session);
ElearningTraineeRoutes.post('/reset_training_session', formData.none(), auth_1.default.verifyAuthenticateToken, elearning_validator_1.default.session_validator(), auth_1.default.handleValidatorError, elearningTraineeTest_controller_1.default.reset_training_session);
ElearningTraineeRoutes.post('/close_training_session', formData.none(), auth_1.default.verifyAuthenticateToken, elearning_validator_1.default.getElearning_Test_trainee_dashboard(), auth_1.default.handleValidatorError, elearningTraineeTest_controller_1.default.close_training_session);
ElearningTraineeRoutes.post('/get_trainee_test_details_info', formData.none(), auth_1.default.verifyAuthenticateToken, elearning_validator_1.default.test_detail_info(), auth_1.default.handleValidatorError, elearningTraineeTest_controller_1.default.get_trainee_test_details);
ElearningTraineeRoutes.post('/get_elearning_test_result', formData.none(), auth_1.default.verifyAuthenticateToken, elearning_validator_1.default.test_result(), auth_1.default.handleValidatorError, elearningTraineeTest_controller_1.default.get_elearning_test_result);
//! THIS URL HANDLING THE TRAINEE ELEARNING
ElearningTraineeRoutes.put('/storeElearningResult/statements', elearningTraineeTest_controller_1.default.store_trainee_test_data);
ElearningTraineeRoutes.put('/storeElearningResult/activities', elearningTraineeTest_controller_1.default.handle_scrom_activities_state);
ElearningTraineeRoutes.get('/storeElearningResult/activities/state', elearningTraineeTest_controller_1.default.handle_scrom_activities_state);
ElearningTraineeRoutes.put('/storeElearningResult/activities/state', elearningTraineeTest_controller_1.default.handle_scrom_activities_state);
exports.default = ElearningTraineeRoutes;
