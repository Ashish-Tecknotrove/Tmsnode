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
const auth_validator_1 = __importDefault(require("./auth.validator"));
const auth_1 = __importDefault(require("../core/middleware/auth"));
const authentication_controller_1 = __importDefault(require("./authentication.controller"));
const authRoutes = express.Router();
// For Accepting Form Data
var multer = require('multer');
var formData = multer();
//TODO LOGIN ROUTES
authRoutes.post('/authentication', formData.none(), //Accept Form Data
auth_validator_1.default.checkLoginParameters(), auth_1.default.handleValidatorError, authentication_controller_1.default.login);
authRoutes.post('/authenticate_token', formData.any(), auth_validator_1.default.verifytokenParameters(), auth_1.default.handleValidatorError, authentication_controller_1.default.verify_token);
exports.default = authRoutes;
