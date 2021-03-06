"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_1 = __importDefault(require("../../../core/middleware/auth"));
const departmentadmin_controller_1 = __importDefault(require("./departmentadmin.controller"));
const departmentadmin_validator_1 = __importDefault(require("./departmentadmin.validator"));
const DepartmentAdminRoutes = (0, express_1.Router)();
3;
var formData = (0, multer_1.default)();
DepartmentAdminRoutes.post("/getDepartmentAssignedTrainer", formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.getAssignedTrainer(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.get_assigned_trainer);
DepartmentAdminRoutes.post("/getTrainerAssignedTrainee_with_without_assigned", formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.getTrainerassignedTrainee(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.get_trainee_assigned_to_trainer_and_not_assigned);
DepartmentAdminRoutes.post("/AssignTrainee", formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.AssignTrainee(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.assign_trainee);
DepartmentAdminRoutes.post("/getDepartmentAssignTrainee", formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.DepartmentTrainee(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.get_department_assign_trainee);
DepartmentAdminRoutes.post('/getTraineeSimulatorConsolidatedReport', formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.DepartmentTraineeSimulatorReport(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.getTraineeSimulatorConsolidatedReport);
DepartmentAdminRoutes.post('/getTraineeElearingConsolidatedReport', formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.DepartmentTraineeElearningReport(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.getTraineeElearingConsolidatedReport);
DepartmentAdminRoutes.post('/getTrainerPerfomance', formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.TrainerPerformance(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.getTrainerPerfomance);
DepartmentAdminRoutes.post('/getTraineePerformanceTrack', formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.TraineePerformanceTrack(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.getTraineeTrainingReport);
DepartmentAdminRoutes.post('/getDashboardCount', formData.none(), auth_1.default.verify_departmentAdmin_AuthenticateToken, departmentadmin_validator_1.default.getDashboardCount(), auth_1.default.handleValidatorError, departmentadmin_controller_1.default.getDashboardCount);
exports.default = DepartmentAdminRoutes;
