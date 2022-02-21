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
const trainer_controller_1 = __importDefault(require("../../app/root/trainer.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const trainer_validator_1 = __importDefault(require("../../validator/root/trainer.validator"));
const Router = express.Router();
var multer = require('multer');
var formData = multer();
Router.post('/registerTrainer', formData.none(), auth_1.default.verifyAuthenticateToken, trainer_validator_1.default.registerTrainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.registerTrainer);
Router.post('/updateTrainer', formData.none(), auth_1.default.verifyAuthenticateToken, trainer_validator_1.default.updateTrainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.updateTrainer);
Router.post('/getTrainers', formData.none(), auth_1.default.verifyAuthenticateToken, trainer_validator_1.default.getTrainersByCompany(), auth_1.default.handleValidatorError, trainer_controller_1.default.getTrainers);
Router.post('/deleteTrainer', formData.none(), auth_1.default.verifyAuthenticateToken, trainer_validator_1.default.deleteTrainer(), auth_1.default.handleValidatorError, trainer_controller_1.default.deleteTrainer);
Router.post('/getTestMarksAttemptByTechnology', formData.any(), auth_1.default.verifyAuthenticateToken, trainer_validator_1.default.getTestMarksAttemptByTechnology(), auth_1.default.handleValidatorError, trainer_controller_1.default.getTestMarksAttemptByTechnology);
Router.post('/submitTestMarksAttemptByTechnology', auth_1.default.verifyAuthenticateToken, trainer_validator_1.default.submitTestMarksAttemptByTechnology(), auth_1.default.handleValidatorError, trainer_controller_1.default.submitTestMarksAttemptByTechnology);
exports.default = Router;
