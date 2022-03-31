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
const response_codes_1 = __importDefault(require("../../strings/response-codes"));
const moment_1 = __importDefault(require("moment"));
const multer = require("multer");
const formData = multer();
const Router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./resources/csv");
    },
    filename: function (req, file, cb) {
        cb(null, (0, moment_1.default)().format('YYYYMMDDHHmmss') + '_' + file.originalname.toLowerCase().split(' ').join('_'));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")) {
        cb(null, true);
    }
    else {
        cb(new Error("Oops! you can only upload excel file."), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file");
Router.post("/bulk", auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.bulkimportTraineevalidate(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            //console.log("Multer error->", err);
            // A Multer error occurred when uploading.
            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        }
        else if (err) {
            // An unknown error occurred when uploading.
            console.log("unknown error->", err);
            res.status(response_codes_1.default.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err.message });
        }
        else {
            console.log("Everything went fine");
            next();
        }
    });
}), trainee_controller_1.default.bulkInsertTrainee);
Router.post("/getTraineeCount", formData.any(), trainee_controller_1.default.getTraineeCount);
Router.post("/registerTrainee", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.registerTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.registerNewTrainee);
Router.post("/updateTrainee", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.updateTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.updateTraineeDetails);
Router.post("/deleteTrainee", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.deleteTraineevalidate(), auth_1.default.handleValidatorError, trainee_controller_1.default.deleteTrainee);
Router.post("/block_unblock_Trainee", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.blockTrainee(), auth_1.default.handleValidatorError, trainee_controller_1.default.blockTrainee);
Router.post("/getTrainee", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_controller_1.default.getTrainee);
Router.post("/getUnassignedTrainee", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_controller_1.default.getUnassignedTrainee);
Router.post("/getAssignTraineeOfTrainer", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.getAssignTraineeOfTrainer(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeOfTrainer);
Router.post("/getAssignTraineeToTrainer", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.getAssignTraineeOfTrainer(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeToTrainer);
Router.post("/getAssignTraineeCurriculum", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.getAssignTraineeCurriculum(), auth_1.default.handleValidatorError, trainee_controller_1.default.getAssignTraineeCurriculum);
//TODO TRAINEE DASHBOARD
Router.post("/getTechnologiesAllotedToTrainee", formData.any(), auth_1.default.verifyAuthenticateToken, trainee_validator_1.default.getAssignTraineeCurriculumValidator(), auth_1.default.handleValidatorError, trainee_controller_1.default.getTechnologiesAllotedToTrainee);
exports.default = Router;
