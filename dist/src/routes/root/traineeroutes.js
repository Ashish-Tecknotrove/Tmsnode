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
const trainee_controller_1 = __importDefault(require("../../app/root/trainee.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const trainee_validator_1 = __importDefault(require("../../validator/root/trainee.validator"));
const multer = require("multer");
const formData = multer();
const Router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resources/csv');
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
const upload = multer({ storage: storage });
Router.post('/bulk', upload.single('file'), //FormData With File
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}), trainee_controller_1.default.bulkInsertTrainee);
Router.post('/registerTrainee', formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.registerTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.registerNewTrainee);
Router.post('/updateTrainee', formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.updateTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.updateTraineeDetails);
Router.post('/deleteTrainee', formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.deleteTraineevalidate(), auth_1.default.handleValidatorError, trainee_controller_1.default.deleteTrainee);
Router.post('/block_unblock_Trainee', formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.blockTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.blockTrainee);
Router.post('/getTrainee', formData.any(), auth_1.default.verifyAuthenticateToken, trainee_controller_1.default.getTrainee);
exports.default = Router;
