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
const simulator_controller_1 = __importDefault(require("../../app/root/simulator.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const simulator_validator_1 = __importDefault(require("../../validator/root/simulator.validator"));
const simulatorRoutes = express.Router();
var multer = require('multer');
var formData = multer();
simulatorRoutes.post('/addSimulator', formData.none(), auth_1.default.verifyAuthenticateToken, simulator_validator_1.default.addSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.addSimulator);
simulatorRoutes.post('/editSimulator', formData.none(), auth_1.default.verifyAuthenticateToken, simulator_validator_1.default.editSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.editSimulator);
simulatorRoutes.post('/deleteSimulator', formData.none(), auth_1.default.verifyAuthenticateToken, simulator_validator_1.default.deleteSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.deleteSimulator);
simulatorRoutes.post('/assignSimulator', formData.none(), auth_1.default.verifyAuthenticateToken, simulator_validator_1.default.assignSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.assignSimulator);
simulatorRoutes.post('/unassignSimulator', formData.none(), auth_1.default.verifyAuthenticateToken, simulator_validator_1.default.unassignSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.unassignSimulator);
simulatorRoutes.post('/getSimulator', formData.none(), auth_1.default.verifyAuthenticateToken, simulator_validator_1.default.getSimulator(), auth_1.default.handleValidatorError, simulator_controller_1.default.getSimulator);
simulatorRoutes.post('/get_company_simulator_list', formData.none(), auth_1.default.verifyAuthenticateToken, simulator_validator_1.default.get_company_simulator_list(), auth_1.default.handleValidatorError, simulator_controller_1.default.get_company_simulator_list);
exports.default = simulatorRoutes;
