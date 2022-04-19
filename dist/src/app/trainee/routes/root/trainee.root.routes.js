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
const trainee_resources_controller_1 = __importDefault(require("../../controller/root/trainee.resources.controller"));
const trainee_root_validator_1 = __importDefault(require("../../validator/root/trainee.root.validator"));
const TraineeRootRoutes = express.Router();
var multer = require('multer');
var formData = multer();
TraineeRootRoutes.post('/getTechnologiesAllotedToTrainee', formData.none(), auth_1.default.verify_traineeAdmin_AuthenticateToken, trainee_root_validator_1.default.getAllottedTecknologies(), auth_1.default.handleValidatorError, trainee_resources_controller_1.default.getTechnologiesAllotedToTrainee);
exports.default = TraineeRootRoutes;
